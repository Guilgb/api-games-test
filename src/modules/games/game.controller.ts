import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchGamesUseCase } from './use-case/search-game/search-games.use-case';
import { SearchGameDto } from './use-case/search-game/dto/search-game.dto';
import { ListGamesUseCase } from './use-case/list-games/list-games.use-case';
import { ListGamesDto } from './use-case/list-games/dto/list-games.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Games')
@Controller('/game')
export class GamesController {
  constructor(
    private readonly searchGamesUseCase: SearchGamesUseCase,
    private readonly listGamesUseCase: ListGamesUseCase,
  ) {}

  @Get('/search')
  async searchGames(@Query('title') title: string) {
    const input: SearchGameDto = { title };
    return await this.searchGamesUseCase.execute(input);
  }

  @Get()
  async listGames(@Query() input: ListGamesDto) {
    return await this.listGamesUseCase.execute(input);
  }
}
