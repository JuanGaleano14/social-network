import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from './src/app.module';
import { UsersService } from './src/users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const users = [
    {
      nombres: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@example.com',
      alias: 'juanp',
      password: '123456',
      fecha_nacimiento: new Date('1990-01-01'),
    },
    {
      nombres: 'María',
      apellidos: 'López',
      email: 'maria@example.com',
      alias: 'marial',
      password: '123456',
      fecha_nacimiento: new Date('1992-06-15'),
    },
  ];

  for (const user of users) {
    const existing = await usersService.findByEmail(user.email);
    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await usersService.create({
        ...user,
        password: hashedPassword,
      });
      console.log(`Usuario ${user.email} creado`);
    } else {
      console.log(`Usuario ${user.email} ya existe`);
    }
  }

  await app.close();
}

bootstrap();
