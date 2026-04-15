import { Injectable, NotFoundException } from '@nestjs/common';

// 1. Описуємо, як виглядає наша гра
export interface Game {
  id: string;
  title: string;
  genre: string;
  totalEndings: number;
}

@Injectable()
export class GamesService {
  // 2. Це наша "база даних" на сьогодні (просто пустий масив)
  private games: Game[] = [];

  // 3. Метод для додавання нової гри
  create(createGameData: Omit<Game, 'id'>) {
    const newGame: Game = {
      id: Date.now().toString(), // Генеруємо унікальний ID
      ...createGameData,
    };
    this.games.push(newGame);
    return newGame; // Повертаємо створену гру
  }

  // 4. Метод для отримання списку всіх ігор
  findAll() {
    return this.games;
  }

  // 5. Метод для пошуку однієї гри за ID
  findOne(id: string) {
    const game = this.games.find(g => g.id === id);
    if (!game) {
      throw new NotFoundException(`Гру з ID ${id} не знайдено`);
    }
    return game;
  }
}