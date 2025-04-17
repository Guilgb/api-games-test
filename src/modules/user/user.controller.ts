import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { CreateUserDto } from './use-cases/create-user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('/user')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    return await this.createUserUseCase.execute(body);
  }
}
