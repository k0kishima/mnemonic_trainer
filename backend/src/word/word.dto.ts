import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WordData, WordsRO } from './word.interface';

export class GetWordsRequest {
  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  offset: number;
}

export class GetWordsResponse implements WordsRO {
  @ApiProperty()
  words: WordData[];

  @ApiProperty()
  wordsCount: number;
}
