import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository, In } from 'typeorm';
import { rand } from '$backend/shared/utils';
import {
  CreateWordRequest,
  CreateWordResponse,
  GetWordsResponse,
} from './word.dto';
import { Word } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  // NOTE: 設計に関して思うこと
  // このクラスがHTTPの異常系に対応する例外と結合する是非は？
  // サービスクラスだからこのケースのエラーだとこのステータスコードを返すとか、
  // そういうビジネスロジックは知ってていい気はしてるので一旦この実装としている
  async create(dto: CreateWordRequest): Promise<CreateWordResponse> {
    const {
      word: { name },
    } = dto;

    const newWord = new Word();
    newWord.name = name;

    try {
      const errors = await validate(newWord);
      if (errors.length > 0) {
        throw new Error('The word input is not valid.');
      }
      const savedWord = await this.wordRepository.save(newWord);
      return { word: savedWord };
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

  async findAll(query): Promise<GetWordsResponse> {
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

  async findRandomly(limit = 10): Promise<Word[]> {
    const quantityOfWords = await this.wordRepository.count();
    // FIXME: ID重複したら指定した数に不足してしまう
    // 単語数自体が多かったら滅多に発生しないので今のところ放置してるが明かなバグなので要修正
    const ids = [...Array(limit)].map(() => rand(1, quantityOfWords));
    return await this.wordRepository.find({ where: { id: In(ids) } });
  }
}
