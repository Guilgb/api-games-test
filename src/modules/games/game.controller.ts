import { Body, Controller, Get } from '@nestjs/common';
import { SearchGamesUseCase } from './use-case/search-game/search-games.use-case';
import { SearchGameInput } from './use-case/search-game/dto/search-game.dto';

@Controller('/game')
export class GamesController {
  constructor(private readonly searchGamesUseCase: SearchGamesUseCase) {}

  @Get('/')
  async createGame(@Body() input: SearchGameInput) {
    return await this.searchGamesUseCase.execute(input);
  }
}
