import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './repository/users.repository';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';




@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,
    {
    provide: APP_PIPE,
    useClass: ValidationPipe
  },
],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
