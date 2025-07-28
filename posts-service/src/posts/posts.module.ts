import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), LikesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
