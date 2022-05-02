import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetWordsResponse, GetWordsRequest } from './word.dto';
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
}
