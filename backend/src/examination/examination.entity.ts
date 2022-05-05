import {
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Word } from '$backend/word/word.entity';
import { Answer } from '$backend/answer/answer.entity';

@Entity({
  engine: 'InnoDB',
})
export class Examination {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('datetime', { nullable: true })
  rememberedAt: Date;

  @Column('datetime', { nullable: true })
  answeredAt: Date;

  @Column('datetime', { nullable: false })
  createdAt: Date;

  @ManyToMany(() => Word)
  @JoinTable()
  words: Word[];

  @OneToMany(() => Answer, (answer) => answer.examination)
  answers: Answer[];
}
