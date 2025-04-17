import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { DBUsersService } from '@modules/db/service/db-users-serivce';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly dataBaseUsersService: DBUsersService,
  ) {}

  async login(body: AuthDto) {
    const user = await this.dataBaseUsersService.getUserByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwt.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
