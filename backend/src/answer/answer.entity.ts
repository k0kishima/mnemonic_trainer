import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Examination } from '$backend/examination/examination.entity';

@Entity({
  engine: 'InnoDB',
})
@Unique(['examination', 'position'])
export class Answer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  value: string;

  @Column({ nullable: false })
  position: number;

  @ManyToOne(() => Examination, (examination) => examination.answers)
  examination: Examination;
}
