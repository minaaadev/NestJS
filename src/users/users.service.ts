import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {EntityManager} from 'typeorm';
import {User} from './entities/user.entity'


@Injectable()
export class UsersService {

  constructor(
    private readonly entityManager: EntityManager,
  ){}

  async CreateUser(name:string, password:string):Promise<User> {

    const user = new User()
    user.name=name
    user.password=password

    return await this.entityManager.save(User,user)
  }

  async login(name:string, password:string):Promise<string>{
    return `로그인이 완료되었습니다. `
  }

  private async checkUserExist(name:string){
    const existingUser = await this.entityManager.findOne(User, { where: { name } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    return false; 
  
  }





  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: LoginUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
