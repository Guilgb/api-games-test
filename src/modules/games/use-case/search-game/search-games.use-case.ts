import { Inject, Injectable } from '@nestjs/common';
import { DbGamesService } from 'src/modules/db/service/db-games.service';
import { RawgProviderInterface } from 'src/modules/provider/rawg-provider/rawg-provider.interface';
import { SearchGameInput } from './dto/search-game.dto';

@Injectable()
export class SearchGamesUseCase {
  constructor(
    @Inject('RawgProvider')
    private readonly rawgProvider: RawgProviderInterface,
    private readonly dbGamesService: DbGamesService,
  ) {}
  async execute(input: SearchGameInput) {
    try {
      const { title } = input;

      const cacheGame = await this.dbGamesService.findByTitle(title);

      if (cacheGame) {
        return cacheGame;
      }

      const externalGameData = await this.rawgProvider.getGameByTitle(title);

      return;
      const saveGame = await this.dbGamesService.save({
        title: externalGameData.title,
        description: externalGameData.description,
        platforms: externalGameData.platforms,
        releaseDate: externalGameData.releaseDate,
        rating: externalGameData.rating,
        coverImage: externalGameData.coverImage,
      });
      return { source: 'Search games use case executed', data: saveGame };
    } catch (error) {
      console.error('Error executing SearchGamesUseCase:', error);
      throw error;
    }
  }
}
