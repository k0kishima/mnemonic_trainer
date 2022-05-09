import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { tearDownDatabase } from 'typeorm-seeding';
import { AppModule } from '$backend/app.module';
import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  let service: ExaminationService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ExaminationService>(ExaminationService);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  describe('makeRemembered', () => {
    describe('正常系', () => {
      it('指定されたエンティティが存在するとき、remembered 状態にする', async () => {
        // TODO: テストデータはサービスではなくてフィクスチャ用のファクトリかなんかで用意する
        const {
          examination: { id },
        } = await service.create();
        const {
          examination: { rememberedAt },
        } = await service.makeRemembered(id);
        expect(rememberedAt).toBeTruthy();
      });
    });

    describe('異常系', () => {
      it('指定されたエンティティが存在しないとき、HttpExceptionをthrowする', async () => {
        // TODO: ここもレコード消す後処理必要
        // サンプル実行語にレコードを消さないと別サンプルで作ったレコードが残っていてそのID指定したらこのサンプル落ちる
        await expect(service.makeRemembered(123)).rejects.toThrowError(
          HttpException,
        );
      });
    });
  });
});
