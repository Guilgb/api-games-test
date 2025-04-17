import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@modules/user/use-cases/create-user/dto/create-user.dto';

@Injectable()
export class DBUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}
  async createUser(input: CreateUserDto): Promise<UsersEntity> {
    const user = await this.userRepository.save({
      name: input.name,
      email: input.email,
      password: input.password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!user) {
      throw new Error('User not created');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
