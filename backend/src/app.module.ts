import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '$backend/config/ormconfig';
import { WordModule } from '$backend/word/word.module';
import { ExaminationModule } from '$backend/examination/examination.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), WordModule, ExaminationModule],
})
export class AppModule {}
