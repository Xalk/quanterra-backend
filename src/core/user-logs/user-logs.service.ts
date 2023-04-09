import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLog } from '@/core/user-logs/entities/user-log.entity';
import { Repository } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class UserLogsService {


  constructor(@InjectRepository(UserLog) private repo: Repository<UserLog>) {
  }

  async create(createUserLogDto: CreateUserLogDto) {
    const userLog = this.repo.create(createUserLogDto);
    userLog.user = { id: createUserLogDto.userId } as User;
    return this.repo.save(userLog);

  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

}
