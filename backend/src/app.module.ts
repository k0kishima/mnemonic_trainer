import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from './config/ormconfig';
import { WordModule } from './word/word.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), WordModule],
})
export class AppModule {}
