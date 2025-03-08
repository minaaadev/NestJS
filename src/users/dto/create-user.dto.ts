import {Post, Body} from '@nestjs/common';

export class CreateUserDto {
    
    name:string
    password:string

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        const {name, password}=createUserDto

        return '유저 생성 완료. 이름:${name}, 비밀번호:${password}'
        
        }

       
    }
