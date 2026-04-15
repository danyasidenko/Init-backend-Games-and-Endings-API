import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ending } from '../../endings/entities/ending.entity';

@Entity() // <-- ОСЬ ЦЕ НАЙГОЛОВНІШЕ! Якщо його немає, база не бачить таблицю
export class Game {
  @PrimaryGeneratedColumn()
  id: number;
  
  // ... далі твій код

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  totalEndings: number;

  @OneToMany(() => Ending, (ending) => ending.game)
  endings: Ending[];
}