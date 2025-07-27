import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class User {
  @ApiProperty({
    example: 'uuid',
    description: 'Identificador único del usuario',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Juan', description: 'Nombres del usuario' })
  @Column()
  nombres: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellidos del usuario' })
  @Column()
  apellidos: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento del usuario',
  })
  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @ApiProperty({ example: 'juanp', description: 'Alias único del usuario' })
  @Column({ unique: true })
  alias: string;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Correo electrónico único del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'hashedpassword',
    description: 'Contraseña hasheada del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Fecha de creación del usuario',
  })
  @CreateDateColumn()
  created_at: Date;
}
