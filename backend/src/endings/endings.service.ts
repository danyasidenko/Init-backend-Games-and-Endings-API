import { Injectable } from '@nestjs/common';

// Описуємо, як виглядає кінцівка
export interface Ending {
  id: string;
  gameId: string; // ID гри, до якої належить ця кінцівка
  name: string;
  description: string;
  isDiscovered: boolean;
}

@Injectable()
export class EndingsService {
  private endings: Ending[] = [];

  // Створення кінцівки
  create(createEndingData: Omit<Ending, 'id'>) {
    const newEnding: Ending = {
      id: Date.now().toString(),
      ...createEndingData,
    };
    this.endings.push(newEnding);
    return newEnding;
  }

  // Отримання всіх кінцівок
  findAll() {
    return this.endings;
  }

  // Фільтрація кінцівок для конкретної гри
  findByGameId(gameId: string) {
    return this.endings.filter(ending => ending.gameId === gameId);
  }
}