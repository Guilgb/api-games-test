import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { DBUsersService } from '@modules/db/service/db-users-serivce';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from '../../../../src/modules/auth/use-case/dto/auth.dto';
import { AuthService } from '../../../../src/modules/auth/use-case/auth.use-case';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let dbUsersService: DBUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn() as jest.Mock<Promise<string>, [object]>,
          },
        },
        {
          provide: DBUsersService,
          useValue: {
            getUserByEmail: jest.fn() as jest.Mock<Promise<any>, [string]>,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    dbUsersService = module.get(DBUsersService) as jest.Mocked<DBUsersService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockUser = {
      id: 123,
      email: 'test@example.com',
      password: 'hashed_password',
    };

    const mockGetUser = {
      id: 123,
      email: 'test@example.com',
      password: 'hashed_password',
      name: 'Test User',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return access token and user data when credentials are valid', async () => {
      jest.mocked(dbUsersService.getUserByEmail).mockResolvedValue(mockGetUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.mocked(jwtService.signAsync).mockResolvedValue('generated_token');

      const result = await authService.login(authDto);

      expect(result).toEqual({
        access_token: 'generated_token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
        },
      });
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      jest.mocked(dbUsersService.getUserByEmail).mockResolvedValue(null);

      await expect(authService.login(authDto)).rejects.toThrow(
        new UnauthorizedException('Credenciais inválidas'),
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      jest.mocked(dbUsersService.getUserByEmail).mockResolvedValue(mockGetUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(authService.login(authDto)).rejects.toThrow(
        new UnauthorizedException('Credenciais inválidas'),
      );
    });

    it('should throw error when database service fails', async () => {
      // Arrange
      jest
        .mocked(dbUsersService.getUserByEmail)
        .mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(authService.login(authDto)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
