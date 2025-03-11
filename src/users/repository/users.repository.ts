import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  //extends Repository<User>{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByName(name: string): Promise<User | null> {
    return await this.repository.findOne({ where: { name } });
  }
  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  create(user: Partial<User>): User {
    return this.repository.create(user);
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async remove(user: User): Promise<void> {
    await this.repository.remove(user);
  }
}
