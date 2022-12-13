import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { UserLoginDto } from './dtos/user-login.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(authLoginDto: UserLoginDto) {
    return await this.validateUser(authLoginDto);
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = userLoginDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
