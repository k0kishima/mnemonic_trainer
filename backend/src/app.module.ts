import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from './config/ormconfig';
import { WordModule } from './word/word.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
