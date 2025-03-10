import { Post, Body } from '@nestjs/common';
import { IsString } from 'class-validator';


export class CreateUserDto {

  @IsString()
  name: string
  password: string
 
}
