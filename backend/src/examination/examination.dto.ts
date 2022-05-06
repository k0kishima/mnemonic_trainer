import { ApiProperty } from '@nestjs/swagger';
import { Examination } from './examination.entity';

export class CreateExaminationResponse {
  @ApiProperty()
  readonly examination: Examination;
}
