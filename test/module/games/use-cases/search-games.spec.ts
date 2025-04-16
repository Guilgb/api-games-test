import { Test, TestingModule } from '@nestjs/testing';
import { SearchGamesUseCase } from '../../../../src/modules/games/use-case/search-game/search-games.use-case';
import { RawgProviderInterface } from '.././../../../src/modules/provider/rawg-provider/rawg-provider.interface';
import { DbGamesService } from '../../../../src/modules/db/service/db-games.service';
import { RedisService } from '../../../../src/modules/redis/service/redis.service';

describe('SearchGamesUseCase', () => {
  let searchGamesUseCase: SearchGamesUseCase;
  let rawgProvider: RawgProviderInterface;
  let dbGamesService: DbGamesService;
  let redisService: RedisService;

  const mockRawgProvider = {
    getGameByTitle: jest.fn(),
  };

  const mockDbGamesService = {
    findByTitle: jest.fn(),
    save: jest.fn(),
  };

  const mockRedisService = {
    getByName: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchGamesUseCase,
        { provide: 'RawgProvider', useValue: mockRawgProvider },
        { provide: DbGamesService, useValue: mockDbGamesService },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    searchGamesUseCase = module.get<SearchGamesUseCase>(SearchGamesUseCase);
    rawgProvider = module.get<RawgProviderInterface>('RawgProvider');
    dbGamesService = module.get<DbGamesService>(DbGamesService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('deve retornar o jogo do cache se estiver disponível', async () => {
    const mockGame = { title: 'Halo', description: 'A sci-fi FPS game' };
    mockRedisService.getByName.mockResolvedValue(JSON.stringify(mockGame));

    const result = await searchGamesUseCase.execute({ title: 'Halo' });

    expect(redisService.getByName).toHaveBeenCalledWith('Halo');
    expect(result).toEqual({ source: 'cache', data: mockGame });
  });

  it('deve retornar o jogo do banco de dados se não estiver no cache', async () => {
    const mockGame = { title: 'Halo', description: 'A sci-fi FPS game' };
    mockRedisService.getByName.mockResolvedValue(null);
    mockDbGamesService.findByTitle.mockResolvedValue(mockGame);

    const result = await searchGamesUseCase.execute({ title: 'Halo' });

    expect(redisService.getByName).toHaveBeenCalledWith('Halo');
    expect(dbGamesService.findByTitle).toHaveBeenCalledWith('Halo');
    expect(redisService.save).toHaveBeenCalledWith('Halo', mockGame);
    expect(result).toEqual({ source: 'database', data: mockGame });
  });

  it('deve buscar o jogo na API externa se não estiver no cache nem no banco de dados', async () => {
    const mockExternalGame = {
      name: 'Halo',
      description: 'A sci-fi FPS game',
      platforms: ['PC', 'Xbox'],
      released: '2001-11-15',
      rating: 4.5,
      background_image: 'https://example.com/halo.jpg',
    };
    const mockSavedGame = {
      title: 'Halo',
      description: 'A sci-fi FPS game',
      platforms: ['PC', 'Xbox'],
      releaseDate: '2001-11-15',
      rating: 4.5,
      coverImage: 'https://example.com/halo.jpg',
    };

    mockRedisService.getByName.mockResolvedValue(null);
    mockDbGamesService.findByTitle.mockResolvedValue(null);
    mockRawgProvider.getGameByTitle.mockResolvedValue(mockExternalGame);
    mockDbGamesService.save.mockResolvedValue(mockSavedGame);

    const result = await searchGamesUseCase.execute({ title: 'Halo' });

    expect(redisService.getByName).toHaveBeenCalledWith('Halo');
    expect(dbGamesService.findByTitle).toHaveBeenCalledWith('Halo');
    expect(rawgProvider.getGameByTitle).toHaveBeenCalledWith('Halo');
    expect(dbGamesService.save).toHaveBeenCalledWith({
      title: 'Halo',
      description: 'A sci-fi FPS game',
      platforms: ['PC', 'Xbox'],
      releaseDate: '2001-11-15',
      rating: 4.5,
      coverImage: 'https://example.com/halo.jpg',
    });
    expect(redisService.save).toHaveBeenCalledWith('Halo', mockSavedGame);
    expect(result).toEqual({ source: 'api', data: mockSavedGame });
  });

  it('deve lançar um erro se ocorrer um problema', async () => {
    mockRedisService.getByName.mockRejectedValue(new Error('Redis error'));

    await expect(searchGamesUseCase.execute({ title: 'Halo' })).rejects.toThrow(
      'Redis error',
    );
  });
});
