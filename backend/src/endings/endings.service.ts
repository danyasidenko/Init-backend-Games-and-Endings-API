import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEndingDto } from './dto/create-ending.dto';
import { UpdateEndingDto } from './dto/update-ending.dto';

export interface Ending {
  id: string;
  gameId: string;
  name: string;
  description: string;
  isDiscovered: boolean;
}

@Injectable()
export class EndingsService {
  private endings: Ending[] = [];

  create(createEndingDto: CreateEndingDto) {
    const newEnding: Ending = {
      id: Date.now().toString(),
      ...createEndingDto,
    };
    this.endings.push(newEnding);
    return newEnding;
  }

  findAll() {
    return this.endings;
  }

  update(id: string, updateEndingDto: UpdateEndingDto) {
    const index = this.endings.findIndex(e => e.id === id);
    if (index === -1) throw new NotFoundException('Кінцівку не знайдено');
    
    this.endings[index] = { ...this.endings[index], ...updateEndingDto };
    return this.endings[index];
  }

  remove(id: string) {
    const index = this.endings.findIndex(e => e.id === id);
    if (index === -1) throw new NotFoundException('Кінцівку не знайдено');
    
    const removed = this.endings[index];
    this.endings.splice(index, 1);
    return removed;
  }
}