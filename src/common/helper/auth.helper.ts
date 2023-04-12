import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { User } from '@/core/users/entities/user.entity';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repo: Repository<User>;
  
  constructor(private readonly jwt: JwtService,
              private readonly i18n: I18nRequestScopeService,
              ) {
  }

  // Decoding the JWT Token
  public async decode(token: string) {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repo.findOneBy({id: decoded.id});
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      const errorMessage = this.i18n.translate('error.USER.FORBIDDEN' );
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}