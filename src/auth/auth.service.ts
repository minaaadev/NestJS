import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>){}
  async signUp(email: string, password: string): Promise<User>{
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepo.create({ email, password: hashedPassword});
    return this.userRepo.save(user)
  }
// async signIn(email: string, password: string):Promise<{accessToken: string}>{
//   const user = await this.userRepo.findOne({where:{email}});
//   if(!user || !(await bcrypt.compare(password, user.password))){
//     throw new UnauthorizedException('invalid credntials')
//   }
//   //return {accessToken : }//JWT 추가
//   }
}
