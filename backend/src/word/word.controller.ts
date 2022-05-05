import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateWordResponse,
  CreateWordRequest,
  GetWordsResponse,
  GetWordsRequest,
} from './word.dto';
import { WordService } from './word.service';

@ApiTags('words')
@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @ApiOperation({ summary: 'Get all words' })
  @ApiQuery({ type: [GetWordsRequest] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all words.',
    type: GetWordsResponse,
  })
  @Get()
  async findAll(@Query() query): Promise<GetWordsResponse> {
    return await this.wordService.find(query);
  }

  @ApiOperation({ summary: 'Create a word' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The word has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The word have already registered.',
  })
  @Post()
  async create(
    @Body() wordData: CreateWordRequest,
  ): Promise<CreateWordResponse> {
    return this.wordService.create(wordData);
  }
}
