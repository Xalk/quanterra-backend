import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCrewMemberDto {

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  shipId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  desc: string
}
