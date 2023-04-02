import { PartialType } from '@nestjs/mapped-types';
import { CreateCrewMemberDto } from './create-crew-member.dto';

export class UpdateCrewMemberDto extends PartialType(CreateCrewMemberDto) {}
