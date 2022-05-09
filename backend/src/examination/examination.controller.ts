import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import {
  CreateExaminationResponse,
  GetExaminationResponse,
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
  @ApiOperation({
    summary: 'Find an examination by id specified at a parameter.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The examination found.',
  })
  @ApiQuery({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id): Promise<GetExaminationResponse> {
    return await this.examinationService.findOne(id);
  }

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
