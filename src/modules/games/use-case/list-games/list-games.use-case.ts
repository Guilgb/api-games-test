import { Injectable } from '@nestjs/common';
import { ListGamesDto } from './dto/list-games.dto';
import { DbGamesService } from '@modules/db/service/db-games.service';

@Injectable()
export class ListGamesUseCase {
  constructor(private readonly dbGamesService: DbGamesService) {}

  async execute(filters?: ListGamesDto) {
    const { title, platform } = filters || {};

    let { page, limit } = filters || {};

    if (!page || !limit) {
      page = 1;
      limit = 10;
    }
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
