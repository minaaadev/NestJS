import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
   
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<string> {
    const { name, password } = dto;
    await this.usersService.CreateUser(name, password);
    return `회원가입이 완료되었습니다.`;
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto): Promise<string> {
    const { name, password } = dto;
    return await this.usersService.login(name, password);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUserById(Number(id));
  }
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(Number(id));
  }

  @Get('sync-status')
  checkSynchronizer() {
    return this.usersService.synchEnabled();
  }
}
