import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word as WordEntity } from './word.entity';
import { WordsRO } from './word.interface';

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
}
