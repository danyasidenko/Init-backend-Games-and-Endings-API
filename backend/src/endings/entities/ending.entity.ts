import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Ending {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDiscovered: boolean;

  @ManyToOne(() => Game, (game) => game.endings, { onDelete: 'CASCADE' })
  game: Game;
}