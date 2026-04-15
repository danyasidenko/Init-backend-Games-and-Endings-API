import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EndingsService } from './endings.service';

@Controller('endings')
export class EndingsController {
  constructor(private readonly endingsService: EndingsService) {}

  @Post()
  create(@Body() createEndingDto: any) {
    return this.endingsService.create(createEndingDto);
  }

  // @Query дозволяє нам приймати параметри в URL (наприклад: ?gameId=123)
  @Get()
  findAll(@Query('gameId') gameId?: string) {
    if (gameId) {
      // Якщо в запиті є gameId, повертаємо кінцівки тільки для цієї гри
      return this.endingsService.findByGameId(gameId);
    }
    // Інакше повертаємо всі існуючі кінцівки
    return this.endingsService.findAll();
  }
}