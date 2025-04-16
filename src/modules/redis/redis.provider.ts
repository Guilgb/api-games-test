import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisProvider extends Redis {
  constructor() {
    super();

    super.on('error', (err) => {
      console.log('Redis error:', err);
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });

    super.on('ready', () => {
      console.log('Redis ready');
    });
  }
}
