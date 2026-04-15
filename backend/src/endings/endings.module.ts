import { Module } from '@nestjs/common';
import { EndingsService } from './endings.service';
import { EndingsController } from './endings.controller';

@Module({
  controllers: [EndingsController],
  providers: [EndingsService],
})
export class EndingsModule {}
