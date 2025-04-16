import { Injectable } from '@nestjs/common';
import { RawgProviderInterface } from '../rawg-provider.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RawgProvider implements RawgProviderInterface {
  constructor(private readonly httpService: HttpService) {}

  async getGameByTitle(name: string): Promise<any> {
    try {
      const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(name)}&key=${process.env.RAWG_API_KEY}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data.results[0];
    } catch (error) {
      throw new Error(`Failed to fetch game details: ${error.message}`);
    }
  }
}
