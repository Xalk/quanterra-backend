import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';
import { AuthHelper } from '@/common/helper/auth.helper';
import { LoginDto } from '@/core/auth/dto/login.dto';
import { RegisterDto } from '@/core/auth/dto/register.dto';
import { UpdateUserDto } from '@/core/users/dto/update-user.dto';


@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repo: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async register(body: RegisterDto): Promise<User | never> {
    let { firstName, lastName, email, password, role }: RegisterDto = body;

    let user: User;

    if (email) {
      user = await this.repo.findOne({ where: { email } });
      if (user) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }

    }

    user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repo.save(user);
  }

  async login(body: LoginDto) {
    const { email, password }: LoginDto = body;
    const user: User = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return {
      user,
      accessToken: this.helper.generateToken(user),
    };
  }

  async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }


}