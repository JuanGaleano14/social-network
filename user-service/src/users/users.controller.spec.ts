import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: '1', username: 'test', password: 'pass' };

const usersServiceMock = {
  findById: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('debe retornar el usuario autenticado sin password', async () => {
      usersServiceMock.findById.mockResolvedValue(mockUser);
      const req = { user: { userId: '1' } };
      const result = await controller.getProfile(req);
      expect(result).toEqual({ id: '1', username: 'test' });
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      usersServiceMock.findById.mockResolvedValue(undefined);
      const req = { user: { userId: '2' } };
      await expect(controller.getProfile(req)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUserById', () => {
    it('debe retornar el usuario por id sin password', async () => {
      usersServiceMock.findById.mockResolvedValue(mockUser);
      const result = await controller.getUserById('1');
      expect(result).toEqual({ id: '1', username: 'test' });
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      usersServiceMock.findById.mockResolvedValue(undefined);
      await expect(controller.getUserById('2')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
