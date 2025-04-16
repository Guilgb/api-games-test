import { Injectable } from '@nestjs/common';
import { IGameCreate } from 'src/modules/db/types/games/IGames';
import { RedisProvider } from '../redis.provider';

@Injectable()
export class RedisService {
  constructor(private readonly redis: RedisProvider) {}

  async save(title: string, input: IGameCreate): Promise<any> {
    const result = await this.redis.set(title, JSON.stringify(input));
    return result;
  }

  async getByName(name: string) {
    const result = await this.redis.get(name);
    return result;
  }
}
