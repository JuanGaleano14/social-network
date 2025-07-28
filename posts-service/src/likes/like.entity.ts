import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
} from 'typeorm';

@Entity('likes')
@Unique(['usuario_id', 'post_id'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  post_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
