import { Injectable } from '@nestjs/common';
import { DbGamesService } from 'src/modules/db/service/db-games.service';
import { ListGamesInput } from './dto/list-games.dto';

@Injectable()
export class ListGamesUseCase {
  constructor(private readonly dbGamesService: DbGamesService) {}

  async execute(filters?: ListGamesInput) {
    const { title, platform, page, limit } = filters || {};

    const games = await this.dbGamesService.listGames({ title, platform });
    const total = games.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      total,
      page,
      limit,
      data: games.slice(startIndex, endIndex),
    };
  }
}
