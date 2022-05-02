import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({
  engine: 'InnoDB',
})
@Unique(['name'])
export class Word {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;
}
