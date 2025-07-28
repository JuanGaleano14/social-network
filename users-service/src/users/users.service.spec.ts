import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUser = {
    id: '1',
    nombres: 'Juan',
    apellidos: 'Pérez',
    fecha_nacimiento: new Date('1990-01-01'),
    alias: 'juanp',
    email: 'juan@example.com',
    password: 'pass',
    created_at: new Date(),
  } as User;

  const userRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('debe retornar un usuario si existe', async () => {
      userRepositoryMock.findOne.mockResolvedValue(mockUser);
      const result = await service.findById('1');
      expect(result).toEqual(mockUser);
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('debe retornar undefined si el usuario no existe', async () => {
      userRepositoryMock.findOne.mockResolvedValue(null);
      const result = await service.findById('2');
      expect(result).toBeUndefined();
    });
  });
});
