import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { CrewMembersService } from '@/core/crew-members/crew-members.service';
import { CreateAndAssignUserDto } from '@/core/ships/dto/create-and-assign-user.dto';
import { AuthService } from '@/core/auth/auth.service';
import { Role } from '@/common/enums/role.enum';

@Injectable()
export class ShipsService {

  constructor(
    @InjectRepository(Ship) private repo: Repository<Ship>,
    private readonly crewMemberService: CrewMembersService,
    private readonly authService: AuthService,
  ) {
  }


  create(createShipDto: CreateShipDto) {
    const ship = this.repo.create(createShipDto);
    return this.repo.save(ship);
  }

  findAll() {
    return this.repo.find({
      relations: {
        crewMember: { user: true }, storageTanks: true,
      },
    });
  }

  async findOne(id: number) {
    const ship = await this.repo.findOne({ where: { id } });

    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    return this.repo.findOne({
      where: { id }, relations: {
        crewMember: { user: true }, storageTanks: true,
      },
    });
  }

  async update(id: number, updateShipDto: UpdateShipDto) {
    const ship = await this.repo.findOne({ where: { id } });

    if (!ship) {
      throw new NotFoundException('Ship not found');
    }

    Object.assign(ship, updateShipDto);

    return this.repo.save(ship);
  }

  async remove(id: number) {
    const ship = await this.repo.findOne({ where: { id } });

    if (!ship) {
      throw new NotFoundException('Ship not found');
    }

    return this.repo.remove(ship);
  }

  async calcTotalCapacity(shipId: number) {
    const ship = await this.repo.findOne({ where: { id: shipId }, relations: ['storageTanks'] });

    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    const total = ship.storageTanks.reduce((acc, tank) => acc + tank.capacity, 0);
    return total;
  }

  async getShipsByUserId(userId: number) {

    const crewMember = await this.crewMemberService.findByUserId(userId);

    return await this.repo.find({
      where: { crewMember: { user: { id: crewMember.user.id } } },
      relations: {
        crewMember: { user: true }, storageTanks: true,
      },
    });
  }

  async createUserAndAssignCrewToShip(createAndAssignUserDto: CreateAndAssignUserDto, id: number) {

    createAndAssignUserDto.password = Math.random().toString(36).slice(-8);

    const dto = { ...createAndAssignUserDto, role: Role.CREW_MEMBER };
    const user = await this.authService.register(dto);


    const crewMember = await this.crewMemberService.create({
      userId: user.id,
      shipId: id,
      desc: 'auto',
    });

    return this.crewMemberService.findOne(crewMember.id);
  }
}
