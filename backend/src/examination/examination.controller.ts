import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateExaminationResponse,
  GetExaminationResponse,
  GetExaminationsRequest,
  GetExaminationsResponse,
  UpdateExaminationResponse,
  AnswerRequest,
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

  @ApiOperation({
    summary: 'Find an examination by id specified at a parameter.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The examination found.',
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id): Promise<GetExaminationResponse> {
    return await this.examinationService.findOne(id);
  }

  @Get()
  async findAll(
    @Query() query: GetExaminationsRequest,
  ): Promise<GetExaminationsResponse> {
    return await this.examinationService.findAll(query);
  }

  @ApiOperation({ summary: 'Make an examination remembered.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The examination has been successfully updated.',
  })
  @ApiParam({ name: 'id' })
  @Patch(':id/remember')
  async remember(@Param('id') id): Promise<UpdateExaminationResponse> {
    return await this.examinationService.makeRemembered(id);
  }

  @ApiOperation({ summary: 'Answer to the examination.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The answer has been successfully posted.',
  })
  @ApiParam({ name: 'id' })
  @Post(':id/answer')
  async answer(
    @Body() answersData: AnswerRequest,
    @Param('id') id,
  ): Promise<UpdateExaminationResponse> {
    return await this.examinationService.answer(id, answersData);
  }
}
