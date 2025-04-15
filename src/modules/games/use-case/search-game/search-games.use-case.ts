import { Inject, Injectable } from '@nestjs/common';
import { DbGamesService } from 'src/modules/db/service/db-games.service';
import { RawgProviderInterface } from 'src/modules/provider/rawg-provider/rawg-provider.interface';

@Injectable()
export class SearchGamesUseCase {
  constructor(
    @Inject('RawgProvider')
    private readonly rawgProvider: RawgProviderInterface,
    private readonly dbGamesService: DbGamesService,
  ) {}
  async execute(input: any) {
    // Implement your search game logic here
    return { message: 'Search games use case executed', input };
  }
}
