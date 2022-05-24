import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Examination } from './examination.entity';

export class CreateExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
}

export class GetExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
}

export class GetExaminationsRequest {
  @ApiPropertyOptional()
  readonly limit: number;

  @ApiPropertyOptional()
  readonly offset: number;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly rememberedDate?: Date;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly answeredDate?: Date;
}

export class GetExaminationsResponse {
  @ApiProperty()
  readonly examinations: Examination[];

  @ApiProperty()
  examinationsCount: number;
}

export class UpdateExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
}

export class AnswerRequest {
  @ApiProperty()
  readonly values: string[];
}
