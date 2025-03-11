import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';


export class LoginUserDto {
  @IsString()
  name: string;
  @IsString()  
  password: string;
}
