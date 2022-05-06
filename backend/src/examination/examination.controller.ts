import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateExaminationResponse } from './examination.dto';
import { ExaminationService } from './examination.service';

@ApiTags('examinations')
@Controller('examinations')
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @ApiOperation({ summary: 'Create an examination' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The examination has been successfully created.',
  })
  @Post()
  async create(): Promise<CreateExaminationResponse> {
    return this.examinationService.create();
  }
}
