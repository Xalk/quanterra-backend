import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserLogDto {

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsNumber()
  userId: number;
}
