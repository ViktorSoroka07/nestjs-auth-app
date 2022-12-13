import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);

    return user.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException();
    }

    return this.usersRepository.findOne({ where: { id } });
  }
}
