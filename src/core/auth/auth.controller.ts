import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  Patch, Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterDto } from '@/core/auth/dto/register.dto';
import { User } from '@/core/users/entities/user.entity';
import { LoginDto } from '@/core/auth/dto/login.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UpdateUserDto } from '@/core/users/dto/update-user.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';


@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@CurrentUser() user: User,  @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+user.id, updateUserDto);
  }
}