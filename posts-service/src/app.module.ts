import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Like } from 'typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'authdb',
      autoLoadEntities: true,
      entities: [Post, Like, User],
      synchronize: true,
    }),
    PostsModule,
    LikesModule,
    AuthModule,
  ],
})
export class AppModule {}
