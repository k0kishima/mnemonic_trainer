import { ApiProperty } from '@nestjs/swagger';
import { Examination } from './examination.entity';

export class CreateExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
}

export class GetExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
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
