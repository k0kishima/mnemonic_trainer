import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity({
  engine: 'InnoDB',
})
@Unique(['name'])
export class Word {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  name: string;
}
