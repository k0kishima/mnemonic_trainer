import { Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import {
  CreateExaminationResponse,
  UpdateExaminationResponse,
} from './examination.dto';
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

  // TODO: こういうパスからパラメータパースするタイプのURLでSwaggerのTry it どう使うのかわからないので調べる
  @ApiOperation({ summary: 'Make an examination remembered.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The examination has been successfully updated.',
  })
  @ApiQuery({ name: 'id' })
  @Patch(':id/remember')
  async remember(@Param('id') id): Promise<UpdateExaminationResponse> {
    return await this.examinationService.makeRemembered(id);
  }
}
