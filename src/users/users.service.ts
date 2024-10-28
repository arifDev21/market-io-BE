import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    await user.hashPassword();
    return user.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await User.findOne({ where: { email: loginUserDto.email } });
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const token = this.jwtService.sign({ sub: user.id });
      return { access_token: token };
    }
    throw new Error('Invalid credentials');
  }
}
