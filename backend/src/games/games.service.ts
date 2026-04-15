import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

export interface Game {
  id: string;
  title: string;
  genre: string;
  totalEndings: number;
}

@Injectable()
export class GamesService {
  private games: Game[] = [];

  create(createGameDto: CreateGameDto) {
    const newGame: Game = {
      id: Date.now().toString(),
      ...createGameDto,
    };
    this.games.push(newGame);
    return newGame;
  }

  findAll() {
    return this.games;
  }

  findOne(id: string) {
    const game = this.games.find(g => g.id === id);
    if (!game) throw new NotFoundException(`Гру з ID ${id} не знайдено`);
    return game;
  }

  // НОВИЙ МЕТОД: Оновлення
  update(id: string, updateGameDto: UpdateGameDto) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    if (gameIndex === -1) throw new NotFoundException(`Гру з ID ${id} не знайдено`);
    
    // Оновлюємо існуючу гру новими даними
    this.games[gameIndex] = { ...this.games[gameIndex], ...updateGameDto };
    return this.games[gameIndex];
  }

  // НОВИЙ МЕТОД: Видалення
  remove(id: string) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    if (gameIndex === -1) throw new NotFoundException(`Гру з id ${id} не знайдено`);
    
    const removedGame = this.games[gameIndex];
    this.games.splice(gameIndex, 1); // Вирізаємо гру з масиву
    return removedGame;
  }
}