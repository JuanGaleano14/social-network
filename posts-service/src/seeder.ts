import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);

  const users = await userRepo.find();

  if (!users.length) {
    console.log('No hay usuarios en la base de datos');
    return await app.close();
  }

  for (const user of users) {
    const existingPosts = await postRepo.count({
      where: { usuario_id: user.id },
    });

    if (existingPosts > 0) {
      console.log(`Usuario ${user.email} ya tiene publicaciones`);
      continue;
    }

    const post = postRepo.create({
      mensaje: `¡Hola! Soy ${user.alias} y esta es mi primera publicación.`,
      usuario_id: user.id,
    });

    await postRepo.save(post);
    console.log(`Publicación creada para ${user.email}`);
  }

  await app.close();
}

bootstrap();
