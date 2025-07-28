import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async like(post_id: string, usuario_id: string): Promise<Like> {
    const already = await this.likesRepository.findOne({
      where: { post_id, usuario_id },
    });

    if (already) {
      throw new ConflictException('Ya le diste like a esta publicación');
    }

    const like = this.likesRepository.create({ post_id, usuario_id });
    return this.likesRepository.save(like);
  }

  async countByPost(post_id: string): Promise<number> {
    return this.likesRepository.count({ where: { post_id } });
  }

  async removeLike(post_id: string, usuario_id: string): Promise<void> {
    const like = await this.likesRepository.findOne({
      where: { post_id, usuario_id },
    });

    if (!like) {
      // Puedes lanzar una excepción o simplemente no hacer nada
      throw new NotFoundException('Like no encontrado');
    }

    await this.likesRepository.remove(like);
  }
}
