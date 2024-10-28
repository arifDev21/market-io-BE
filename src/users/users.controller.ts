import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    return { message: 'Login successful', user };
  }
}
