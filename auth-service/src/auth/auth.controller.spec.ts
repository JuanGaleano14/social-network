import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn().mockResolvedValue({ access_token: 'jwt-token' }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe retornar un access_token al hacer login', async () => {
    const dto: LoginDto = { email: 'test@email.com', password: '123456' };
    const result = await controller.login(dto);
    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
  });
});
