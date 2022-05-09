import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, MoreThan, Repository } from 'typeorm';
import { Answer } from '$backend/answer/answer.entity';
import {
  AnswerRequest,
  CreateExaminationResponse,
  GetExaminationResponse,
  GetExaminationsResponse,
  UpdateExaminationResponse,
} from './examination.dto';
import { WordService } from '$backend/word/word.service';
import { Examination } from './examination.entity';

@Injectable()
export class ExaminationService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @InjectRepository(Examination)
    private readonly examinationRepository: Repository<Examination>,

    private readonly wordService: WordService,

    private connection: Connection,
  ) {}

  async create(): Promise<CreateExaminationResponse> {
    const newEntity = new Examination();
    newEntity.createdAt = new Date();
    newEntity.words = await this.wordService.findRandomly();
    const savedEntity = await this.examinationRepository.save(newEntity);

    return { examination: savedEntity };
  }

  async findOne(id): Promise<GetExaminationResponse> {
    const persistedEntity = await this.examinationRepository.findOne({
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

  async findAll(cursorById, limit = 10): Promise<GetExaminationsResponse> {
    const qb = this.examinationRepository.createQueryBuilder('examanitions');
    const examinationsCount = await qb.getCount();

    qb.limit(limit);
    qb.offset(cursorById);
    const examinations = await qb
      .where({ id: MoreThan(cursorById) })
      .orderBy({ id: 'ASC' })
      .getMany();

    return { examinations, examinationsCount };
  }

  async makeRemembered(id: number): Promise<UpdateExaminationResponse> {
    const persistedEntity = await this.examinationRepository.findOne(id);
    if (!persistedEntity) {
      throw new HttpException(
        { message: 'an examination which specified by id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    persistedEntity.rememberedAt = new Date();
    const savedEntity = await this.examinationRepository.save(persistedEntity);

    return { examination: savedEntity };
  }

  async answer(
    id: number,
    dto: AnswerRequest,
  ): Promise<UpdateExaminationResponse> {
    const examination = await this.examinationRepository.findOne(id);
    if (!examination) {
      throw new HttpException(
        { message: 'an examination which specified by id not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (examination.answeredAt) {
      const errors = {
        examinationId: 'already had been answered by specified id',
      };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { values } = dto;
    await this.examinationRepository.save(examination);
    this.connection.transaction(async (_) => {
      examination.answeredAt = new Date();
      await this.examinationRepository.save(examination);

      const answers = values.map((value, i) => {
        const entity = new Answer();
        entity.examination = examination;
        entity.value = value;
        entity.position = i + 1;
        return entity;
      });

      await this.answerRepository.save(answers);
    });

    return { examination: examination };
  }
}
