import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesEntity } from '../db/entities/games.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DbGamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private readonly gamesRepository: Repository<GamesEntity>,
  ) {}
}
