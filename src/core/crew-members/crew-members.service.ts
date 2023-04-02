import { Injectable } from '@nestjs/common';
import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';
import { User } from '@/core/users/entities/user.entity';
import { Ship } from '@/core/ships/entities/ship.entity';

@Injectable()
export class CrewMembersService {

  constructor(@InjectRepository(CrewMember) private repo: Repository<CrewMember>) {
  }


  async create(createCrewMemberDto: CreateCrewMemberDto) {
    const crewMember = this.repo.create(createCrewMemberDto);
    crewMember.user = { id: createCrewMemberDto.userId } as User;
    crewMember.ship = { id: createCrewMemberDto.shipId } as Ship;
    return this.repo.save(crewMember);
  }

  findAll() {

    return this.repo.find({ relations: ['user', 'ship'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} crewMember`;
  }

  update(id: number, updateCrewMemberDto: UpdateCrewMemberDto) {
    return `This action updates a #${id} crewMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} crewMember`;
  }
}
