import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCrewMemberDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  shipId: number;

  @IsString()
  @IsOptional()
  desc: string
}
