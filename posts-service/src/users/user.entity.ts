import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  email: string;

  @Column()
  alias: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
