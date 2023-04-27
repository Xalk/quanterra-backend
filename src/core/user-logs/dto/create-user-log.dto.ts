import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLogDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  method?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  route?: string;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
