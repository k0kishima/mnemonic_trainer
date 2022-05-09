import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Word } from './word.entity';

export class GetWordsRequest {
  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  offset: number;
}

export class GetWordsResponse {
  @ApiProperty()
  words: Word[];

  @ApiProperty()
  wordsCount: number;
}

export class CreateWordRequest {
  @ApiProperty()
  readonly word: {
    readonly name: string;
  };
}

export class CreateWordResponse {
  @ApiProperty()
  word: Word;
}
