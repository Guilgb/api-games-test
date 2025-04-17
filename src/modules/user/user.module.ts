import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { DBUsersService } from '@modules/db/service/db-users-serivce';
import { UsersEntity } from '@modules/db/entities/users.entity';
import { UsersController } from './user.controller';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [CreateUserUseCase, DBUsersService],
})
export class UsersModule {}
