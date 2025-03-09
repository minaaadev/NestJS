import { Injectable, NotFoundException, UnauthorizedException,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {EntityManager} from 'typeorm';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(private readonly entityManager: EntityManager){}


  async CreateUser(name:string, password:string):Promise<User> {

    const existingUser = await this.entityManager.findOne(User, { where: { name } });
    if (existingUser) {
      throw new HttpException('이미 존재하는 사용자입니다.', HttpStatus.BAD_REQUEST); 
    }

    await this.checkUserExist(name)
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User()
    user.name=name
    user.password=password

    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds)

    return await this.entityManager.save(User,user)
  }

  async login(name:string, password:string):Promise<string>{
    const user = await this.entityManager.findOne(User, {where:{name}})
    
    if(!user){
      throw new NotFoundException('사용자가 존재하지 않습니다.')
    }

    const isPasswordValid=await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.')
    }
    
    return `로그인이 완료되었습니다. `
  }

  private async checkUserExist(name:string){
    const existingUser = await this.entityManager.findOne(User, { where: { name } });
    if (existingUser) {
      throw new Error('이미 존재하는 사용자입니다.');
    }
    return false; 
  
  }


  async getUserById(id:number){
    const user = await this.entityManager.findOne(User,{where:{id}})
    if(!user){
      throw new NotFoundException(`id가 ${id}인 사용자가 존재하지 않습니다.`)
    } 
    return user
  }

  update(id: number, updateUserDto: LoginUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteUser(id:number):Promise<string>{
    const user = await this.entityManager.findOne(User, {where:{id}})

    if (!user){
      throw new Error(`id가 ${id}인 사용자가 존재하지 않습니다.`)
    }
    
    await this.entityManager.remove(User, user)
    return `id가 ${id}인 사용자가 삭제되었습니다.`
  }
}
