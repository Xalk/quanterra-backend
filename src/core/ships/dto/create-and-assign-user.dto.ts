import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAndAssignUserDto {
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
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: Role;

}