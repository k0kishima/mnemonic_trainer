import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateWordRequest } from './word.dto';
import { Word as WordEntity } from './word.entity';
import { WordsRO, WordRO } from './word.interface';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async find(query): Promise<WordsRO> {
    const qb = this.wordRepository.createQueryBuilder('words');
    const wordsCount = await qb.getCount();

    const limit = 'limit' in query ? query.limit : 10;
    qb.limit(limit);

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const words = await qb.select(['words.id', 'words.name']).getMany();

    return { words, wordsCount };
  }

  // NOTE: 設計に関して思うこと
  // このクラスがHTTPの異常系に対応する例外と結合する是非は？
  // サービスクラスだからこのケースのエラーだとこのステータスコードを返すとか、
  // そういうビジネスロジックは知ってていい気はしてるので一旦この実装としている
  async create(dto: CreateWordRequest): Promise<WordRO> {
    const {
      word: { name },
    } = dto;

    const newWord = new WordEntity();
    newWord.name = name;

    try {
      const errors = await validate(newWord);
      if (errors.length > 0) {
        throw new Error('The word input is not valid.');
      }
      const savedWord = await this.wordRepository.save(newWord);
      return this.buildWordRO(savedWord);
    } catch (e) {
      throw new HttpException(
        // TODO: DB設計レベルの詳細度でエラーメッセージを出さない
        // 例えばこんなやつ
        //  "Duplicate entry 'mnemonic' for key 'words.IDX_975efd50047f02b2266a8d8e9c'"
        // とはいえ、NotNUll絡みのエラーもメッセージが "Column 'name' cannot be null" なだけで、
        // 例外自体は一律 QueryFailedError で投げてくるのでその辺の制御の実装コストの兼ね合いで対応 pending
        { message: e.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private buildWordRO(word: WordEntity) {
    const wordRO = {
      id: word.id,
      name: word.name,
    };

    return { word: wordRO };
  }
}
