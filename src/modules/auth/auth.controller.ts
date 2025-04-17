import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './use-case/dto/auth.dto';
import { AuthService } from './use-case/auth.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
