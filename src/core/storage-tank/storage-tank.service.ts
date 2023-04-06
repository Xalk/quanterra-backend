import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageTankDto } from './dto/create-storage-tank.dto';
import { UpdateStorageTankDto } from './dto/update-storage-tank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { Repository } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { Waste } from '@/core/wastes/entities/waste.entity';
import { Sensor } from '@/core/sensors/entities/sensor.entity';

@Injectable()
export class StorageTankService {

  constructor(@InjectRepository(StorageTank) private repo: Repository<StorageTank>) {
  }

  create(createStorageTankDto: CreateStorageTankDto) {
    const storageTank = this.repo.create(createStorageTankDto);
    storageTank.ship = { id: createStorageTankDto.shipId } as Ship;
    storageTank.waste = { id: createStorageTankDto.wasteId } as Waste;
    storageTank.sensor = { id: createStorageTankDto.sensorId } as Sensor;

    return this.repo.save(storageTank);
  }

  findAll() {
    return this.repo.find({ relations: ['ship', 'waste'] });
  }

  async findOne(id: number) {
    const storageTank = await this.repo.findOne({ where: { id } });

    if (!storageTank) {
      throw new NotFoundException('Storage tank not found');
    }
    return this.repo.findOne({
      where: { id },
      relations: ['ship', 'waste', 'collectionRecords', 'sensor'],
    });
  }

  async update(id: number, updateStorageTankDto: UpdateStorageTankDto) {
    const storageTank = await this.repo.findOne({ where: { id } });

    if (!storageTank) {
      throw new NotFoundException('Storage tank not found');
    }

    Object.assign(storageTank, updateStorageTankDto);

    storageTank.sensor = { id: updateStorageTankDto.sensorId } as Sensor;

    return this.repo.save(storageTank);
  }

  async remove(id: number) {
    const storageTank = await this.repo.findOne({ where: { id } });

    if (!storageTank) {
      throw new NotFoundException('Storage tank not found');
    }

    return this.repo.remove(storageTank);
  }
}
