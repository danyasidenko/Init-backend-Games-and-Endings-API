import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
  // Ось цей рядок офіційно реєструє таблицю Game:
  imports: [TypeOrmModule.forFeature([Game])], 
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}