import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('LikesService', () => {
  let service: LikesService;
  let likesRepository: any;

  beforeEach(async () => {
    likesRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      count: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide: getRepositoryToken(Like),
          useValue: likesRepository,
        },
      ],
    }).compile();
    service = module.get<LikesService>(LikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('like', () => {
    it('debería crear un like si no existe', async () => {
      likesRepository.findOne.mockResolvedValue(null);
      likesRepository.create.mockReturnValue({ post_id: '1', usuario_id: '2' });
      likesRepository.save.mockResolvedValue({
        id: 1,
        post_id: '1',
        usuario_id: '2',
      });
      const result = await service.like('1', '2');
      expect(result).toEqual({ id: 1, post_id: '1', usuario_id: '2' });
      expect(likesRepository.save).toHaveBeenCalled();
    });
    it('debería lanzar ConflictException si ya existe el like', async () => {
      likesRepository.findOne.mockResolvedValue({});
      await expect(service.like('1', '2')).rejects.toThrow(ConflictException);
    });
  });

  describe('countByPost', () => {
    it('debería retornar el número de likes de un post', async () => {
      likesRepository.count.mockResolvedValue(5);
      const result = await service.countByPost('1');
      expect(result).toBe(5);
    });
  });

  describe('removeLike', () => {
    it('debería eliminar un like existente', async () => {
      likesRepository.findOne.mockResolvedValue({ id: 1 });
      likesRepository.remove.mockResolvedValue(undefined);
      await service.removeLike('1', '2');
      expect(likesRepository.remove).toHaveBeenCalledWith({ id: 1 });
    });
    it('debería lanzar NotFoundException si el like no existe', async () => {
      likesRepository.findOne.mockResolvedValue(null);
      await expect(service.removeLike('1', '2')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
