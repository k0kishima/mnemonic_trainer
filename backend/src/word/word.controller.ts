import { Controller, Get, Query } from '@nestjs/common';
import { WordService } from './word.service';
import { WordsRO } from './word.interface';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  async findAll(@Query() query): Promise<WordsRO> {
    return await this.wordService.find(query);
  }
}
