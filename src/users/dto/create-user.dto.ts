import {Post, Body} from '@nestjs/common';

export class CreateUserDto {
    
    name:string
    password:string

    }