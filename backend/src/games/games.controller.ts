import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // Обробляє POST-запити за адресою /games
  @Post()
  create(@Body() createGameDto: any) {
    return this.gamesService.create(createGameDto);
  }

  // Обробляє GET-запити за адресою /games
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  // Обробляє GET-запити за адресою /games/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }
}