import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {User} from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const {name, password} = dto
    await this.usersService.CreateUser(name, password)
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto): Promise<string> {
    const {name, password} = dto
    return await this.usersService.login(name, password)
  }


  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<User>{
    console.log(userId)
    return new User()
  }
  
}
