import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesEntity } from '../entities/games.entity';
import { Repository } from 'typeorm';
import { IGameCreate } from '../types/games/IGames';

@Injectable()
export class DbGamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private readonly gamesRepository: Repository<GamesEntity>,
  ) {}

  async getByName(title: string): Promise<GamesEntity> {
    const result = await this.gamesRepository.findOneBy({
      title,
    });
    return result;
  }

  async createTitle(input: IGameCreate): Promise<GamesEntity> {
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
}
