import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WordData, WordsRO, WordRO } from './word.interface';

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

export class CreateWordRequest {
  @ApiProperty()
  readonly word: {
    readonly name: string;
  };
}

export class CreateWordResponse implements WordRO {
  @ApiProperty()
  word: WordData;
}
