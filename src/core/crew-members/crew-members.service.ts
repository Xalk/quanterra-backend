import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';
import { User } from '@/core/users/entities/user.entity';
import { Ship } from '@/core/ships/entities/ship.entity';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class CrewMembersService {

  constructor(@InjectRepository(CrewMember) private repo: Repository<CrewMember>,
              private readonly i18n: I18nRequestScopeService,
  ) {
  }


  async create(createCrewMemberDto: CreateCrewMemberDto) {
    const crewMember = this.repo.create(createCrewMemberDto);
    crewMember.user = { id: createCrewMemberDto.userId } as User;
    crewMember.ship = { id: createCrewMemberDto.shipId } as Ship;
    return this.repo.save(crewMember);
  }

  findAll() {

    return this.repo.find({ relations: ['user', 'ship'], order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const crewMember = await this.repo.findOne({ where: { id }, relations: ['user', 'ship'] });

    if (!crewMember) {
      const errorMessage = this.i18n.translate('error.CREW_MEMBER.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }
    return crewMember;
  }

  async update(id: number, updateCrewMemberDto: UpdateCrewMemberDto) {
    const crewMember = await this.findOne(id);
    Object.assign(crewMember, updateCrewMemberDto);
    crewMember.ship = { id: updateCrewMemberDto.shipId } as Ship;
    return this.repo.save(crewMember);
  }

  async remove(id: number) {
    const crewMember = await this.findOne(id);
    return this.repo.remove(crewMember);
  }

  async removeFromShip(id: number) {
    const crewMember = await this.findOne(id);
    crewMember.ship = null;
    return this.repo.save(crewMember);
  }

  async findByUserId(userId: number) {

    const crewMember = await this.repo.findOne({ where: { user: { id: userId } }, relations: ['user'] });

    if (!crewMember) {
      const errorMessage = this.i18n.translate('error.CREW_MEMBER.NOT_CREW_MEMBER');
      throw new NotFoundException(errorMessage);
    }

    return crewMember;
  }


}
