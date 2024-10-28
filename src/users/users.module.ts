import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { MulterModule } from '@nestjs/platform-express';
import { AuthStrategy } from './auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthStrategy],
})
export class UsersModule {}
