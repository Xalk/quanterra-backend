import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthHelper } from '@/common/helper/auth.helper';
import { User } from '@/core/users/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: true,
    });
  }

  private validate(payload: string): Promise<User | never> {
    return this.helper.validateUser(payload);
  }
}