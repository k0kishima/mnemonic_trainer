import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Examination } from './examination.entity';
import {
  CreateExaminationResponse,
  GetExaminationResponse,
  UpdateExaminationResponse,
} from './examination.dto';
import { WordService } from '$backend/word/word.service';

@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Examination)
    private readonly repository: Repository<Examination>,

    private readonly wordService: WordService,
  ) {}

  async create(): Promise<CreateExaminationResponse> {
    const newEntity = new Examination();
    newEntity.createdAt = new Date();
    newEntity.words = await this.wordService.findRandomly();
    const savedEntity = await this.repository.save(newEntity);

    return { examination: savedEntity };
  }

  async findOne(id): Promise<GetExaminationResponse> {
    const persistedEntity = await this.repository.findOne({
      where: { id: id },
      relations: ['words', 'answers'],
    });

    if (!persistedEntity) {
      throw new HttpException(
        { message: 'an examination which specified by id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { examination: persistedEntity };
  }

  async makeRemembered(id: number): Promise<UpdateExaminationResponse> {
    const persistedEntity = await this.repository.findOne(id);
    if (!persistedEntity) {
      throw new HttpException(
        { message: 'an examination which specified by id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    persistedEntity.rememberedAt = new Date();
    const savedEntity = await this.repository.save(persistedEntity);

    return { examination: savedEntity };
  }
}
