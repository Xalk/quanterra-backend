import { Injectable } from '@nestjs/common';
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
    return `This action returns all ships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ship`;
  }

  update(id: number, updateShipDto: UpdateShipDto) {
    return `This action updates a #${id} ship`;
  }

  remove(id: number) {
    return `This action removes a #${id} ship`;
  }
}
