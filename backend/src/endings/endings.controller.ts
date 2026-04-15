import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EndingsService } from './endings.service';
import { CreateEndingDto } from './dto/create-ending.dto';
import { UpdateEndingDto } from './dto/update-ending.dto';

@Controller('endings')
export class EndingsController {
  constructor(private readonly endingsService: EndingsService) {}

  @Post()
  create(@Body() createEndingDto: CreateEndingDto) {
    return this.endingsService.create(createEndingDto);
  }

  @Get()
  findAll() {
    return this.endingsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEndingDto: UpdateEndingDto) {
    return this.endingsService.update(id, updateEndingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.endingsService.remove(id);
  }
}