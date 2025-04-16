import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesList } from '../db/entities';
import { GamesController } from './game.controller';
import { SearchGamesUseCase } from './use-case/search-game/search-games.use-case';
import { RawgProvider } from '../provider/rawg-provider/implementations/rawg-provider';
import { DbGamesService } from '../db/service/db-games.service';
import { RedisProvider } from '../redis/redis.provider';
import { RedisService } from '../redis/service/redis.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature(entitiesList),
  ],
  controllers: [GamesController],
  providers: [
    DbGamesService,
    RedisProvider,
    RedisService,
    SearchGamesUseCase,
    {
      provide: 'RawgProvider',
      useClass: RawgProvider,
    },
  ],
})
export class GamesModule {}
