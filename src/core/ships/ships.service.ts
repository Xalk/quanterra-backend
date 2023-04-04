import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';

@Injectable()
export class ShipsService {

  constructor(@InjectRepository(Ship) private repo: Repository<Ship>) {
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
    return this.repo.findOne({ where: { id } });
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
}
