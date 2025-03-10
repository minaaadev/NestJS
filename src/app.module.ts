import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ConfigModule을 글로벌로 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],  
      inject: [ConfigService],  
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User],  
        synchronize: false,  
      }),
    }),
    UsersModule, 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
