import { Injectable } from '@nestjs/common';
import { ListGamesInput } from './dto/list-games.dto';
import { DbGamesService } from '@modules/db/service/db-games.service';

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
