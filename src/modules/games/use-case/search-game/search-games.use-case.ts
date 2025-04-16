import { Inject, Injectable } from '@nestjs/common';
import { DbGamesService } from 'src/modules/db/service/db-games.service';
import { RawgProviderInterface } from 'src/modules/provider/rawg-provider/rawg-provider.interface';
import { SearchGameInput } from './dto/search-game.dto';
import { RedisService } from 'src/modules/redis/service/redis.service';

@Injectable()
export class SearchGamesUseCase {
  constructor(
    @Inject('RawgProvider')
    private readonly rawgProvider: RawgProviderInterface,
    private readonly dbGamesService: DbGamesService,
    private readonly redisService: RedisService,
  ) {}
  async execute(input: SearchGameInput) {
    try {
      const { title } = input;

      const cachedGame = await this.redisService.getByName(title);
      if (cachedGame) {
        return { source: 'cache', data: JSON.parse(cachedGame) };
      }

      const dbGame = await this.dbGamesService.findByTitle(title);
      if (dbGame) {
        await this.redisService.save(title, {
          title: dbGame.title,
          description: dbGame.description,
          platforms: dbGame.platforms,
          releaseDate: dbGame.releaseDate,
          rating: dbGame.rating,
          coverImage: dbGame.coverImage,
        });

        return { source: 'database', data: dbGame };
      }

      const externalGameData = await this.rawgProvider.getGameByTitle(title);

      const savedGame = await this.dbGamesService.save({
        title: externalGameData.name,
        description: externalGameData.description || null,
        platforms: externalGameData.platforms,
        releaseDate: externalGameData.released,
        rating: externalGameData.rating,
        coverImage: externalGameData.background_image,
      });

      await this.redisService.save(title, {
        title: savedGame.title,
        description: savedGame.description,
        platforms: savedGame.platforms,
        releaseDate: savedGame.releaseDate,
        rating: savedGame.rating,
        coverImage: savedGame.coverImage,
      });

      return { source: 'api', data: savedGame };
    } catch (error) {
      console.error('Error executing SearchGamesUseCase:', error);
      throw error;
    }
  }
}
