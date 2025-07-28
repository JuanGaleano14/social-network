import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: any;

  beforeEach(async () => {
    postsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: postsRepository,
        },
      ],
    }).compile();
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear y guardar un post', async () => {
      const dto: CreatePostDto = { mensaje: 'Hola' };
      const usuario_id = 'user1';
      const post = { ...dto, usuario_id };
      postsRepository.create.mockReturnValue(post);
      postsRepository.save.mockResolvedValue({ id: 1, ...post });
      const result = await service.create(dto, usuario_id);
      expect(result).toEqual({ id: 1, ...post });
      expect(postsRepository.create).toHaveBeenCalledWith({
        ...dto,
        usuario_id,
      });
      expect(postsRepository.save).toHaveBeenCalledWith(post);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los posts ordenados', async () => {
      const posts = [{ id: 1 }, { id: 2 }];
      postsRepository.find.mockResolvedValue(posts);
      const result = await service.findAll();
      expect(result).toBe(posts);
      expect(postsRepository.find).toHaveBeenCalledWith({
        order: { fecha_publicacion: 'DESC' },
      });
    });
  });
});
