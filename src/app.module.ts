import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host:'localhost',
      port:3306,
      username:'root',
      password:'0329',
      database:'login',
      entities:[User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
