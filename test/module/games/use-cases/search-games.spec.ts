import { Test, TestingModule } from '@nestjs/testing';
import { SearchGamesUseCase } from '../../../../src/modules/games/use-case/search-game/search-games.use-case';
import { RawgProviderInterface } from '../../../../src/modules/provider/rawg-provider/rawg-provider.interface';
import { DbGamesService } from '../../../../src/modules/db/service/db-games.service';
import { RedisCacheService } from '../../../../src/modules/redis/service/redis-cache.service';

describe('SearchGamesUseCase', () => {
  let searchGamesUseCase: SearchGamesUseCase;
  let rawgProvider: RawgProviderInterface;
  let dbGamesService: DbGamesService;
  let redisCacheService: RedisCacheService;

  const gameTitle = 'Halo';
  const mockGame = {
    title: gameTitle,
    description: 'Um jogo de FPS sci-fi',
    platforms: ['PC', 'Xbox'],
    releaseDate: '2001-11-15',
    rating: 4.5,
    coverImage: 'https://exemplo.com/halo.jpg',
  };

  const mockRawgProvider = {
    getGameByTitle: jest.fn(),
  };

  const mockDbGamesService = {
    findByTitle: jest.fn(),
    save: jest.fn(),
  };

  const mockRedisCacheService = {
    getByName: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchGamesUseCase,
        { provide: 'RawgProvider', useValue: mockRawgProvider },
        { provide: DbGamesService, useValue: mockDbGamesService },
        { provide: RedisCacheService, useValue: mockRedisCacheService },
      ],
    }).compile();

    searchGamesUseCase = module.get<SearchGamesUseCase>(SearchGamesUseCase);
    rawgProvider = module.get<RawgProviderInterface>('RawgProvider');
    dbGamesService = module.get<DbGamesService>(DbGamesService);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('deve retornar o jogo do banco de dados se não estiver no cache', async () => {
      mockRedisCacheService.getByName.mockResolvedValue(null);
      mockDbGamesService.findByTitle.mockResolvedValue(mockGame);

      const saveMock = jest.fn().mockResolvedValue('OK');
      (redisCacheService.save as jest.Mock) = saveMock;

      const result = await searchGamesUseCase.execute({ title: gameTitle });

      expect(redisCacheService.getByName).toHaveBeenCalledWith(gameTitle);
      expect(dbGamesService.findByTitle).toHaveBeenCalledWith(gameTitle);

      expect(saveMock).toHaveBeenCalledTimes(1);

      const [savedKey, savedValue] = saveMock.mock.calls[0];

      expect(savedKey).toBe(gameTitle);

      if (typeof savedValue === 'string') {
        expect(JSON.parse(savedValue)).toEqual(mockGame);
      } else {
        expect(savedValue).toEqual(mockGame);
      }

      expect(result).toEqual({
        source: 'database',
        data: mockGame,
      });
    });

    it('deve retornar o jogo do banco de dados se não estiver no cache', async () => {
      mockRedisCacheService.getByName.mockResolvedValue(null);
      mockDbGamesService.findByTitle.mockResolvedValue(mockGame);

      const saveMock = jest.fn().mockResolvedValue('OK');
      (redisCacheService.save as jest.Mock) = saveMock;

      const result = await searchGamesUseCase.execute({ title: gameTitle });

      expect(redisCacheService.getByName).toHaveBeenCalledWith(gameTitle);
      expect(dbGamesService.findByTitle).toHaveBeenCalledWith(gameTitle);

      expect(saveMock).toHaveBeenCalledTimes(1);

      const [savedKey, savedValue] = saveMock.mock.calls[0];
      expect(savedKey).toBe(gameTitle);

      expect(JSON.parse(JSON.stringify(savedValue))).toEqual(mockGame);

      expect(result).toEqual({
        source: 'database',
        data: mockGame,
      });
    });

    it('deve buscar o jogo na API externa se não estiver no cache nem no banco de dados', async () => {
      const mockExternalGame = {
        name: gameTitle,
        description: 'Um jogo de FPS sci-fi',
        platforms: ['PC', 'Xbox'],
        released: '2001-11-15',
        rating: 4.5,
        background_image: 'https://exemplo.com/halo.jpg',
      };

      const expectedGameData = {
        coverImage: 'https://exemplo.com/halo.jpg',
        description: 'Um jogo de FPS sci-fi',
        platforms: ['PC', 'Xbox'],
        rating: 4.5,
        releaseDate: '2001-11-15',
        title: 'Halo',
      };

      const saveMock = jest.fn().mockResolvedValue('OK');
      (redisCacheService.save as jest.Mock) = saveMock;
      (redisCacheService.getByName as jest.Mock).mockResolvedValue(null);
      (dbGamesService.findByTitle as jest.Mock).mockResolvedValue(null);
      (rawgProvider.getGameByTitle as jest.Mock).mockResolvedValue(
        mockExternalGame,
      );
      (dbGamesService.save as jest.Mock).mockResolvedValue(expectedGameData);

      await searchGamesUseCase.execute({ title: gameTitle });

      expect(redisCacheService.getByName).toHaveBeenCalledWith(gameTitle);
      expect(dbGamesService.findByTitle).toHaveBeenCalledWith(gameTitle);
      expect(rawgProvider.getGameByTitle).toHaveBeenCalledWith(gameTitle);

      expect(saveMock).toHaveBeenCalledTimes(1);

      const [, savedValue] = saveMock.mock.calls[0];

      if (typeof savedValue === 'string') {
        expect(JSON.parse(savedValue)).toEqual(expectedGameData);
      } else {
        expect(savedValue).toEqual(expectedGameData);
      }
    });

    it('deve lançar um erro se ocorrer um problema', async () => {
      const error = new Error('Erro no Redis');
      mockRedisCacheService.getByName.mockRejectedValue(error);

      await expect(
        searchGamesUseCase.execute({ title: gameTitle }),
      ).rejects.toThrow('Erro no Redis');
    });
  });
});
