import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LikesService } from '../likes/likes.service';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: any;
  let likesService: any;

  beforeEach(async () => {
    postsService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };
    likesService = {
      like: jest.fn(),
      removeLike: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: postsService },
        { provide: LikesService, useValue: likesService },
      ],
    }).compile();
    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un post', async () => {
      const dto: CreatePostDto = { mensaje: 'Hola' };
      const req = { user: { userId: 'user1' } };
      postsService.create.mockResolvedValue({
        id: 1,
        ...dto,
        usuario_id: 'user1',
      });
      const result = await controller.create(dto, req);
      expect(result).toEqual({ id: 1, ...dto, usuario_id: 'user1' });
      expect(postsService.create).toHaveBeenCalledWith(dto, 'user1');
    });
  });

  describe('getAll', () => {
    it('debería retornar todos los posts', async () => {
      const posts = [{ id: 1 }, { id: 2 }];
      postsService.findAll.mockResolvedValue(posts);
      const result = await controller.getAll();
      expect(result).toBe(posts);
    });
  });

  describe('like', () => {
    it('debería dar like a un post', async () => {
      likesService.like.mockResolvedValue({
        id: 1,
        post_id: '1',
        usuario_id: 'user1',
      });
      const req = { user: { userId: 'user1' } };
      const result = await controller.like('1', req);
      expect(result).toEqual({ id: 1, post_id: '1', usuario_id: 'user1' });
      expect(likesService.like).toHaveBeenCalledWith('1', 'user1');
    });
  });

  describe('removeLike', () => {
    it('debería quitar el like de un post', async () => {
      likesService.removeLike.mockResolvedValue(undefined);
      const req = { user: { userId: 'user1' } };
      await controller.removeLike('1', req);
      expect(likesService.removeLike).toHaveBeenCalledWith('1', 'user1');
    });
  });
});
