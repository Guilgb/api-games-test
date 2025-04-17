import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => ({
        type: 'single',
        url: `redis://${configService.get<string>('REDIS_HOST', 'redis')}:${configService.get<number>('REDIS_PORT', 6379)}`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbRedisModule {}
