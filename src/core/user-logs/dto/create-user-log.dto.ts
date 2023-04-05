import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserLogDto {

  @IsOptional()
  @IsBoolean()
  isAutomated?: boolean;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsOptional()
  @IsString()
  action?: string;

  @IsNumber()
  userId: number;
}
