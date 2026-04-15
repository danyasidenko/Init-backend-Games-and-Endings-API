import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ending } from './entities/ending.entity';
import { CreateEndingDto } from './dto/create-ending.dto';

@Injectable()
export class EndingsService {
  constructor(
    @InjectRepository(Ending)
    private endingsRepository: Repository<Ending>,
  ) {}

  async create(createEndingDto: CreateEndingDto) {
    const ending = this.endingsRepository.create({
      ...createEndingDto,
      game: { id: Number(createEndingDto.gameId) } as any,
    });
    return await this.endingsRepository.save(ending);
  }

  async findAll() {
    return await this.endingsRepository.find({ relations: ['game'] });
  }

  // Цей метод шукає кінцівки за ID гри (його чекає контролер)
  async findByGameId(gameId: string) {
    return await this.endingsRepository.find({
      where: { game: { id: Number(gameId) } },
      relations: ['game'],
    });
  }

  async findOne(id: number) {
    const ending = await this.endingsRepository.findOne({ 
      where: { id }, 
      relations: ['game'] 
    });
    if (!ending) throw new NotFoundException(`Кінцівку з ID ${id} не знайдено`);
    return ending;
  }

  async remove(id: number) {
    const ending = await this.findOne(id);
    await this.endingsRepository.remove(ending);
    return { message: `Кінцівку ${id} видалено` };
  }
}