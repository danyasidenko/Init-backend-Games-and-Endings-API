import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = this.gamesRepository.create(createGameDto);
    return await this.gamesRepository.save(game);
  }

  async findAll() {
    return await this.gamesRepository.find({ relations: ['endings'] });
  }

  // ТУТ МАЄ БУТИ number!
  async findOne(id: number) {
    const game = await this.gamesRepository.findOne({ where: { id }, relations: ['endings'] });
    if (!game) throw new NotFoundException(`Гру з ID ${id} не знайдено`);
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);
    this.gamesRepository.merge(game, updateGameDto);
    return await this.gamesRepository.save(game);
  }

  async remove(id: number) {
    const game = await this.findOne(id);
    await this.gamesRepository.remove(game);
    return { message: `Гру ${id} видалено` };
  }
}