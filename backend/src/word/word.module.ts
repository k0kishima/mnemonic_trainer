import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from './word.controller';
import { Word as WordEntity } from './word.entity';
import { WordService } from './word.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  providers: [WordService],
  controllers: [WordController],
  exports: [WordService],
})
export class WordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
