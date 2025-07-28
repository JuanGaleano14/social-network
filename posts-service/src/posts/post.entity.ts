import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('publicaciones')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mensaje: string;

  @Column()
  usuario_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_publicacion: Date;
}
