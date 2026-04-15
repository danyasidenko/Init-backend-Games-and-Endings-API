import { Module } from '@nestjs/common';
import { EndingsService } from './endings.service';
import { EndingsController } from './endings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ending } from './entities/ending.entity';

@Module({
  // Ось цей рядок офіційно реєструє таблицю Ending:
  imports: [TypeOrmModule.forFeature([Ending])], 
  controllers: [EndingsController],
  providers: [EndingsService],
})
export class EndingsModule {}