import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';
import { AuthHelper } from '@/common/helper/auth.helper';
import { LoginDto } from '@/core/auth/dto/login.dto';
import { RegisterDto } from '@/core/auth/dto/register.dto';
import { UpdateUserDto } from '@/core/users/dto/update-user.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { RefreshToken } from '@/core/auth/dto/refresh-token.dto';


@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repo: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(private readonly i18n: I18nRequestScopeService) {
  }

  async register(body: RegisterDto) {
    let { firstName, lastName, email, password, role }: RegisterDto = body;

    let user: User;

    if (email) {
      user = await this.repo.findOne({ where: { email } });
      if (user) {
        const errorMessage = this.i18n.translate('error.USER.EMAIL_ALREADY_IN_USE');
        throw new HttpException(errorMessage, HttpStatus.CONFLICT);
      }

    }

    user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    await this.repo.save(user);

    const { accessToken, refreshToken } = await this.getTokenPair(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(body: LoginDto) {
    const { email, password }: LoginDto = body;
    const user: User = await this.repo.findOne({ where: { email } });

    if (!user) {
      const errorMessage = this.i18n.translate('error.USER.NOT_FOUND');
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      const errorMessage = this.i18n.translate('error.USER.INVALID_LOGIN_CREDENTIALS');
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    const { accessToken, refreshToken } = await this.getTokenPair(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshToken) {
    const { refreshToken: tokenToCheck } = dto;
    const res = await this.helper.checkToken(tokenToCheck);

    const user = await this.repo.findOne({ where: { id: res.id } });

    const { accessToken, refreshToken } = await this.getTokenPair(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      const errorMessage = this.i18n.translate('error.USER.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  private async getTokenPair(user: User) {
    const accessToken = this.helper.generateToken(user, '7d');
    const refreshToken = this.helper.generateToken(user, '30d');
    return { accessToken, refreshToken };
  }


}