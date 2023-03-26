import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class CreateUserDto {

  @MinLength(2)
  @IsString()
  firstName: string;

  @MinLength(2)
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: Role
}
