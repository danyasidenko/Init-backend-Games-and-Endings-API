import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { EndingsModule } from './endings/endings.module';

@Module({
  imports: [GamesModule, EndingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
