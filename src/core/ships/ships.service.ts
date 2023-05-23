import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { CrewMembersService } from '@/core/crew-members/crew-members.service';
import { CreateAndAssignUserDto } from '@/core/ships/dto/create-and-assign-user.dto';
import { AuthService } from '@/core/auth/auth.service';
import { Role } from '@/common/enums/role.enum';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { EmailService } from '@/core/crew-members/email.service';
import { CollectionRecordsService } from '@/core/collection-records/collection-records.service';

@Injectable()
export class ShipsService {

  constructor(
    @InjectRepository(Ship) private repo: Repository<Ship>,
    private readonly crewMemberService: CrewMembersService,
    private readonly authService: AuthService,
    private readonly i18n: I18nRequestScopeService,
    private readonly emailService: EmailService,
    private readonly collectionRecordsService: CollectionRecordsService,
  ) {

  }


  create(createShipDto: CreateShipDto) {
    const ship = this.repo.create(createShipDto);
    return this.repo.save(ship);
  }

  findAll(searchTerm: string) {
    return this.repo.find({
      relations: {
        crewMember: { user: true },
        storageTanks: true,
      },
      where: {
        shipName: ILike(`%${searchTerm}%`),
      },
    });
  }

  async findOne(id: number) {
    const ship = await this.repo.findOne({
      where: { id }, relations: {
        crewMember: { user: true },
        storageTanks: { waste: true, sensor: true, collectionRecords: true },
      },
    });


    if (!ship) {
      const errorMessage = this.i18n.translate('error.SHIP.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }
    return ship;
  }

  async update(id: number, updateShipDto: UpdateShipDto) {
    const ship = await this.findOne(id);
    Object.assign(ship, updateShipDto);
    return this.repo.save(ship);
  }

  async remove(id: number) {
    const ship = await this.findOne(id);
    return this.repo.remove(ship);
  }

  async calcTotalCapacity(shipId: number) {
    const ship = await this.findOne(shipId);
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
    createAndAssignUserDto.role = Role.CREW_MEMBER;

    const { user } = await this.authService.register(createAndAssignUserDto);

    if (id === -1) {
      id = null;
    }

    const crewMember = await this.crewMemberService.create({
      userId: user.id,
      shipId: id,
      desc: 'auto',
    });

    await this.emailService.sendPasswordEmail(user.email, createAndAssignUserDto.password);

    return this.crewMemberService.findOne(crewMember.id);
  }

  async main() {
    const crewMembers = await this.crewMemberService.findAll();
    const ships = await this.repo.find();
    const totalTreatedAmount = await this.collectionRecordsService.getTotalTreatedAmountByMonth();


    return {
      crewCount: crewMembers.length,
      shipsCount: ships.length,
      totalTreatedAmount,
      last10Members: crewMembers.slice(-10)
    };
  }
}
