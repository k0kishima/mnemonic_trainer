import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExaminationController } from './examination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { ExaminationService } from './examination.service';
import { WordModule } from '$backend/word/word.module';

@Module({
  // TODO:
  // WordServiceだけインポートしたいんだけど、その依存関係も必要なので雑にモジュールごとインポートしてる
  // 必要最低限のものだけインポートするようにしたい
  imports: [TypeOrmModule.forFeature([Examination]), WordModule],
  providers: [ExaminationService],
  controllers: [ExaminationController],
  exports: [ExaminationService],
})
export class ExaminationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
