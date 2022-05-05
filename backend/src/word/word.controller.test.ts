import { Test } from '@nestjs/testing';
import { tearDownDatabase } from 'typeorm-seeding';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { Word as WordEntity } from './word.entity';
import { AppModule } from '$backend/app.module';

describe('WordController', () => {
  let controller: WordController;
  let service: WordService;

  beforeEach(async () => {
    // TODO: モジュールの作り方を改善する
    // AppModule からではなく、以下のように必要最低限の要素をベースにテスト用モジュールを作りたい
    /*
    const module = await Test.createTestingModule({
      imports: [ TypeOrmModule.forRoot(), TypeOrmModule.forFeature([WordEntity]), ],
      controllers: [WordController],
      providers: [WordService],
    }).compile();
    */
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<WordService>(WordService);

    service = module.get<WordService>(WordService);
    controller = module.get<WordController>(WordController);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  describe('findAll', () => {
    it('単語の配列を返す', async () => {
      const words: WordEntity[] = [];
      const createWord = (id, name) => {
        const word = new WordEntity();
        word.id = id;
        word.name = name;
        return word;
      };
      words.push(createWord(1, 'foo'));
      words.push(createWord(2, 'bar'));
      const wordsCount = words.length;

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve({ words, wordsCount }));

      const findAllResult = await controller.findAll({});
      expect(findAllResult).toMatchObject({ words, wordsCount });
    });
  });
});
