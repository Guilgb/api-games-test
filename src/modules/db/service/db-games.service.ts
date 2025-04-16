import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesEntity } from '../entities/games.entity';
import { Repository } from 'typeorm';
import { IGameCreate } from '../types/games/IGames';
import { ListGamesInput } from 'src/modules/games/use-case/list-games/dto/list-games.dto';

@Injectable()
export class DbGamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private readonly gamesRepository: Repository<GamesEntity>,
  ) {}

  async findByTitle(title: string): Promise<GamesEntity> {
    const result = await this.gamesRepository
      .createQueryBuilder('game')
      .where('LOWER(game.title) LIKE LOWER(:title)', { title: `%${title}%` })
      .getOne();

    if (!result) {
      return null;
    }
    return result;
  }

  async save(input: IGameCreate): Promise<GamesEntity> {
    const { title, description, platforms, releaseDate, rating, coverImage } =
      input;

    const newGame = this.gamesRepository.create({
      title: title,
      description: description,
      platforms: platforms,
      releaseDate: releaseDate,
      rating: rating,
      coverImage: coverImage,
    });
    return await this.gamesRepository.save(newGame);
  }

  async listGames(filters: ListGamesInput): Promise<GamesEntity[]> {
    const query = this.gamesRepository.createQueryBuilder('game');

    if (filters.title) {
      query.andWhere('LOWER(game.title) LIKE LOWER(:title)', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.platform) {
      query.andWhere('LOWER(game.platforms::text) LIKE LOWER(:platform)', {
        platform: `%${filters.platform}%`,
      });
    }

    return await query.getMany();
  }
}
