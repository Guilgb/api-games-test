import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { DBUsersService } from '@modules/db/service/db-users-serivce';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersService: DBUsersService) {}

  async execute(input: CreateUserDto) {
    try {
      const hashedPassword = await hash(input.password, 10);
      const email = await this.usersService.getUserByEmail(input.email);

      if (email) {
        throw new Error('Email already exists');
      }
      const user = await this.usersService.createUser({
        email: input.email,
        password: hashedPassword,
        name: input.name,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
