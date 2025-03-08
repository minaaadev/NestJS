import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])],  
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],  // 다른 모듈에서도 AuthService 사용 가능하게 함
})
export class AuthModule {}
