import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { tearDownDatabase } from 'typeorm-seeding';
import { AppModule } from '$backend/app.module';
import { WordService } from './word.service';

// TODO: テスト終了後でもレコードが残ってしまっているので消すようにする
describe('WordService', () => {
  let service: WordService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<WordService>(WordService);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  describe('create', () => {
    describe('正常系', () => {
      it('単語のレコードを作成する', async () => {
        const ro = await service.create({ word: { name: 'foo' } });
        expect(ro).toMatchObject({ word: { name: 'foo' } });
      });
    });

    describe('異常系', () => {
      it('すでに単語が登録されている場合、HttpExceptionをthrowする', async () => {
        const wordName = 'bar';
        await service.create({ word: { name: wordName } });
        await expect(
          service.create({ word: { name: wordName } }),
        ).rejects.toThrowError(HttpException);
      });

      it('単語が不正な場合、HttpExceptionをthrowする', async () => {
        await expect(
          service.create({ word: { name: '' } }),
        ).rejects.toThrowError(HttpException);

        await expect(
          service.create({ word: { name: null } }),
        ).rejects.toThrowError(HttpException);
      });
    });
  });
});
