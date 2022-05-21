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
  limit: number;

  @ApiPropertyOptional()
  offset: number;
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
