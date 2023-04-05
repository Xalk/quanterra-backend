import { Injectable, NotFoundException } from '@nestjs/common';
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

    return this.repo.find();
  }

  async findOne(id: number) {
    const crewMember = await this.repo.findOne({ where: { id } });

    if (!crewMember) {
      throw new NotFoundException('Crew member not found');
    }
    return this.repo.findOne({ where: { id }, relations: ['user', 'ship'] });
  }

  async update(id: number, updateCrewMemberDto: UpdateCrewMemberDto) {
    const crewMember = await this.repo.findOne({ where: { id } });

    if (!crewMember) {
      throw new NotFoundException('Crew member not found');
    }

    // Object.assign(crewMember, updateCrewMemberDto);

    return this.repo.save({
      ...crewMember,
      ...updateCrewMemberDto,
    });
  }

  async remove(id: number) {
    const crewMember = await this.repo.findOne({ where: { id } });

    if (!crewMember) {
      throw new NotFoundException('Crew member not found');
    }

    return this.repo.remove(crewMember);
  }

  async findByUserId(userId: number) {

    const crewMember = await this.repo.findOne({ where: { user: { id: userId } }, relations: ['user'] });

    if (!crewMember) {
      throw new NotFoundException('User is not a crew member');
    }

    return crewMember
  }

}
