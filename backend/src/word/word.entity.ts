import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({
  engine: 'InnoDB',
})
@Unique(['name'])
export class Word {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: false })
  name: string;
}
