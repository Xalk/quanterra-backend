import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty()
  @MinLength(2)
  @IsString()
  firstName: string;

  @ApiProperty()
  @MinLength(2)
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: Role;
}