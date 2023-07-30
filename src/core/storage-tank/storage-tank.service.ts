import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageTankDto } from './dto/create-storage-tank.dto';
import { UpdateStorageTankDto } from './dto/update-storage-tank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { Repository } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { Waste } from '@/core/wastes/entities/waste.entity';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class StorageTankService {
  constructor(
    @InjectRepository(StorageTank) private repo: Repository<StorageTank>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  create(createStorageTankDto: CreateStorageTankDto) {
    const storageTank = this.repo.create(createStorageTankDto);
    storageTank.ship = { id: createStorageTankDto.shipId } as Ship;
    storageTank.waste = { id: createStorageTankDto.wasteId } as Waste;
    storageTank.sensor = { id: createStorageTankDto.sensorId } as Sensor;

    return this.repo.save(storageTank);
  }

  findAll() {
    return this.repo.find({
      relations: ['ship', 'waste', 'sensor', 'collectionRecords'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const storageTank = await this.repo.findOne({
      where: { id },
      relations: ['ship', 'waste', 'collectionRecords', 'sensor'],
    });

    if (!storageTank) {
      const errorMessage = this.i18n.translate('error.STORAGE_TANK.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }
    return storageTank;
  }

  async update(id: number, updateStorageTankDto: UpdateStorageTankDto) {
    const storageTank = await this.findOne(id);
    Object.assign(storageTank, updateStorageTankDto);
    storageTank.sensor = { id: updateStorageTankDto.sensorId } as Sensor;
    storageTank.waste = { id: updateStorageTankDto.wasteId } as Waste;
    storageTank.ship = { id: updateStorageTankDto.shipId } as Ship;
    return this.repo.save(storageTank);
  }

  async remove(id: number) {
    const storageTank = await this.findOne(id);
    return this.repo.remove(storageTank);
  }
}
