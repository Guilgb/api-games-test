import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IGameCreate } from '@modules/db/types/games/IGames';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown, ttl = 0) {
    await this.cache.set(key, value, ttl);
  }

  async save(title: string, input: IGameCreate): Promise<string> {
    const result = await this.cache.set(title, JSON.stringify(input));
    return result;
  }

  async getByName(name: string): Promise<string | null> {
    const result = await this.cache.get(name);

    if (!result) {
      return null;
    }

    return result as string;
  }

  async del(key: string) {
    await this.cache.del(key);
  }

  async reset() {
    await this.cache.clear();
  }
}
