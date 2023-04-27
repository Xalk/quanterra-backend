import { PartialType } from '@nestjs/mapped-types';
import { CreateCrewMemberDto } from './create-crew-member.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCrewMemberDto extends PartialType(CreateCrewMemberDto) {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  shipId: number;

  @ApiProperty()
  desc: string;
}
