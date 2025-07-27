import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class User {
  @ApiProperty({ example: 'uuid', description: 'ID único del usuario' })
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
    type: String,
  })
  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @ApiProperty({ example: 'juanp', description: 'Alias único del usuario' })
  @Column({ unique: true })
  alias: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Email único del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'hashedpassword',
    description: 'Contraseña del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: '2025-07-27T15:00:00.000Z',
    description: 'Fecha de creación del usuario',
    type: String,
  })
  @CreateDateColumn()
  created_at: Date;
}
