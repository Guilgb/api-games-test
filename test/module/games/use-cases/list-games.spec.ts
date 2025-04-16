import { Test, TestingModule } from '@nestjs/testing';
import { ListGamesUseCase } from '../../../../src/modules/games/use-case/list-games/list-games.use-case';
import { DbGamesService } from '../../../../src/modules/db/service/db-games.service';

describe('ListGamesUseCase', () => {
  let listGamesUseCase: ListGamesUseCase;
  let dbGamesService: DbGamesService;

  const mockDbGamesService = {
    listGames: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListGamesUseCase,
        { provide: DbGamesService, useValue: mockDbGamesService },
      ],
    }).compile();

    listGamesUseCase = module.get<ListGamesUseCase>(ListGamesUseCase);
    dbGamesService = module.get<DbGamesService>(DbGamesService);
  });

  it('deve listar jogos sem filtros', async () => {
    const mockGames = [
      { id: 1, title: 'Halo', platforms: ['PC', 'Xbox'] },
      { id: 2, title: 'The Witcher', platforms: ['PC', 'PlayStation'] },
    ];
    mockDbGamesService.listGames.mockResolvedValue(mockGames);

    const result = await listGamesUseCase.execute({ page: 1, limit: 10 });

    expect(dbGamesService.listGames).toHaveBeenCalledWith({
      title: undefined,
      platform: undefined,
    });
    expect(result).toEqual({
      total: 2,
      page: 1,
      limit: 10,
      data: mockGames,
    });
  });

  it('deve listar jogos com filtro por título', async () => {
    const mockGames = [{ id: 1, title: 'Halo', platforms: ['PC', 'Xbox'] }];
    mockDbGamesService.listGames.mockResolvedValue(mockGames);

    const result = await listGamesUseCase.execute({
      title: 'Halo',
      page: 1,
      limit: 10,
    });

    expect(dbGamesService.listGames).toHaveBeenCalledWith({
      title: 'Halo',
      platform: undefined,
    });
    expect(result).toEqual({
      total: 1,
      page: 1,
      limit: 10,
      data: mockGames,
    });
  });

  it('deve listar jogos com filtro por plataforma', async () => {
    const mockGames = [
      { id: 2, title: 'The Witcher', platforms: ['PC', 'PlayStation'] },
    ];
    mockDbGamesService.listGames.mockResolvedValue(mockGames);

    const result = await listGamesUseCase.execute({
      platform: 'PC',
      page: 1,
      limit: 10,
    });

    expect(dbGamesService.listGames).toHaveBeenCalledWith({
      title: undefined,
      platform: 'PC',
    });
    expect(result).toEqual({
      total: 1,
      page: 1,
      limit: 10,
      data: mockGames,
    });
  });

  it('deve paginar os resultados corretamente', async () => {
    const mockGames = [
      { id: 1, title: 'Halo', platforms: ['PC', 'Xbox'] },
      { id: 2, title: 'The Witcher', platforms: ['PC', 'PlayStation'] },
      { id: 3, title: 'Cyberpunk', platforms: ['PC', 'PlayStation'] },
    ];
    mockDbGamesService.listGames.mockResolvedValue(mockGames);

    const result = await listGamesUseCase.execute({ page: 2, limit: 2 });

    expect(result).toEqual({
      total: 3,
      page: 2,
      limit: 2,
      data: [{ id: 3, title: 'Cyberpunk', platforms: ['PC', 'PlayStation'] }],
    });
  });
});
