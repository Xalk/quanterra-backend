import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>,
              private readonly i18n: I18nRequestScopeService,

              ) {
  }



  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {

    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      const errorMessage = this.i18n.translate('error.USER.NOT_FOUND' );
      throw new NotFoundException(errorMessage);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.repo.remove(user);
  }
}
