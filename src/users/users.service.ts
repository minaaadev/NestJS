import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async CreateUser(name: string, password: string): Promise<User> {
    const existingUser = await this.entityManager.findOne(User, {
      where: { name },
    });
    if (existingUser) {
      throw new HttpException(
        '이미 존재하는 사용자입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.password = hashedPassword;

    return await this.entityManager.save(user);
  }

  async login(name: string, password: string): Promise<string> {
    console.log('Received name:', name);
    console.log('Received password:', password);

    try {
      const user = await this.entityManager.findOne(User, { where: { name } });

      if (!user) {
        console.log(`user not found: ${name}`);
        throw new NotFoundException('사용자가 존재하지 않습니다.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log(`${name}님의 로그인이 완료되었습니다. `);
      }

      return '로그인 되었습니다';
    } catch (error) {
      console.log(error.stack);
      throw error;
    }
  }

  private async checkUserExist(name: string) {
    const existingUser = await this.entityManager.findOne(User, {
      where: { name },
    });
    if (existingUser) {
      throw new Error('이미 존재하는 사용자입니다.');
    }
    return false;
  }
  async getUserById(id: number) {
    const user = await this.entityManager.findOne(User, { where: { id } });
    if (!user) {
      throw new NotFoundException(`id가 ${id}인 사용자가 존재하지 않습니다.`);
    }
    return user;
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.entityManager.findOne(User, { where: { id } });

    if (!user) {
      throw new Error(`id가 ${id}인 사용자가 존재하지 않습니다.`);
    }

    await this.entityManager.remove(User, user);
    return `id가 ${id}인 사용자가 삭제되었습니다.`;
  }

  async onModuleInit() {
    await this.synchEnabled(); // 서버 시작 시 synchEnabled 실행
  }

  async synchEnabled() {
    const synchronizerEnabled = this.configService.get<string>(
      'SYNCHRONIZER_ENABLED',
    );

    if (synchronizerEnabled === 'false') {
      console.log('Synchronizer가 비활성화되었습니다.');
      return false;
    }

    console.log('Synchronizer가 활성화되었습니다.');
    return true;
  }
}
