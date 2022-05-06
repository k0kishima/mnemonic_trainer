import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './examination.entity';
import { CreateExaminationResponse } from './examination.dto';
import { WordService } from '$backend/word/word.service';

@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private readonly repository: Repository<Examination>,

    private readonly wordService: WordService,
  ) {}

  async create(): Promise<CreateExaminationResponse> {
    const words = await this.wordService.findRandomly();
    const newEntity = new Examination();
    newEntity.createdAt = new Date();
    newEntity.words = words;
    const savedEntity = await this.repository.save(newEntity);
    return { examination: savedEntity };
  }
}
