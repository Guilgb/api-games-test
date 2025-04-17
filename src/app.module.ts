import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/db/database.module';
import { GamesModule } from './modules/games/game.module';
import { DbRedisModule } from './modules/redis/redis.module';
import { UsersModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GamesModule,
    UsersModule,
    AuthModule,
    DbRedisModule,
  ],
})
export class AppModule {}
