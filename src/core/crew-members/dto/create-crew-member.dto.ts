import { IsNumber, IsString } from 'class-validator';

export class CreateCrewMemberDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  shipId: number;

  @IsString()
  desc: string
}
