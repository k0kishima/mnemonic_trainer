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

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const words = await qb.getMany();

    return { words, wordsCount };
  }
}
