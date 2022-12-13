import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUser(@Query('email') email: string): Promise<User> {
    if (!email) {
      throw new NotFoundException();
    }

    return await this.usersService.findUserByEmail(email);
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }
}
