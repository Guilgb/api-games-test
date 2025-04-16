import { Injectable } from '@nestjs/common';
import { DbGamesService } from 'src/modules/db/service/db-games.service';

@Injectable()
export class ListGamesUseCase {
  constructor(private readonly dbGamesService: DbGamesService) {}

  async execute(filters?: { title?: string; platform?: string }) {
    const { title, platform } = filters || {};

    // Chama o serviço do banco de dados com os filtros
    return await this.dbGamesService.listGames({ title, platform });
  }
}
