import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async register(@Body() authLoginDto: UserLoginDto) {
    await this.usersService.createUser(authLoginDto);

    return this.authService.login(authLoginDto);
  }

  @Post('/login')
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'You have authorized!';
  }
}
