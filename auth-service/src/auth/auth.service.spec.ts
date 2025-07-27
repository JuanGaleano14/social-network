import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUsersService = {
      findByEmail: jest.fn(),
    };
    const mockJwtService = {
      signAsync: jest.fn().mockResolvedValue('jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar un access_token si las credenciales son correctas', async () => {
    const user = { id: '1', alias: 'juan', email: 'test@email.com', password: '123456' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await service.login('test@email.com', '123456');
    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, alias: user.alias });
  });

  it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
    await expect(service.login('no@existe.com', '123456')).rejects.toThrow('Usuario no encontrado');
  });

  it('debe lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
    const user = { id: '1', alias: 'juan', email: 'test@email.com', password: '123456' };
    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(service.login('test@email.com', 'wrongpass')).rejects.toThrow('Credenciales incorrectas');
  });
});
