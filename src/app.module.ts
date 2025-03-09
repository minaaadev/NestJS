import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ConfigModule을 글로벌로 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // ConfigModule 사용
      inject: [ConfigService],  // ConfigService 주입
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User],  // 엔티티 설정
        synchronize: true,  // 애플리케이션 실행 시, 자동으로 DB 테이블 생성
      }),
    }),
    UsersModule,  // UsersModule 연결
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
