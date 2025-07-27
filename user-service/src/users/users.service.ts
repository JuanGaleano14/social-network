import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { id } })) ?? undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (
      (await this.userRepository.findOne({ where: { email } })) ?? undefined
    );
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }
}
