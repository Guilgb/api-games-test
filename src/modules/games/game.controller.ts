import { Body, Controller, Post } from '@nestjs/common';
import { SearchGamesUseCase } from './use-case/search-game/search-games.use-case';

@Controller('/game')
export class GamesController {
  constructor(private readonly searchGamesUseCase: SearchGamesUseCase) {}

  @Post('/')
  async createGame(@Body() input: any) {
    return await this.searchGamesUseCase.execute(input);
  }
}
