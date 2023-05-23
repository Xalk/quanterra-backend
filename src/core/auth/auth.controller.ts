import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '@/core/auth/dto/register.dto';
import { User } from '@/core/users/entities/user.entity';
import { LoginDto } from '@/core/auth/dto/login.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UpdateUserDto } from '@/core/users/dto/update-user.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RefreshToken } from '@/core/auth/dto/refresh-token.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @ApiBody({ type: RegisterDto })
  private register(@Body() body: RegisterDto) {
    return this.service.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  private login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @Post('refresh')
  private refresh(@Body() refreshToken: RefreshToken) {
    return this.service.refresh(refreshToken);
  }

  @Patch('profile')
  @ApiBody({ type: RegisterDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateProfile(@CurrentUser() user: User,  @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+user.id, updateUserDto);
  }
}
