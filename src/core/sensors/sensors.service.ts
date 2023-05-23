import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { StorageTankService } from '@/core/storage-tank/storage-tank.service';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Injectable()
export class SensorsService {

  constructor(@InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
              private readonly i18n: I18nRequestScopeService,
              private readonly storageTankService: StorageTankService,
  ) {
  }

  create(createSensorDto: CreateSensorDto) {
    const sensor = this.sensorRepository.create(createSensorDto);
    sensor.connectionKey = (Math.random() + 1).toString(36).substring(6);
    sensor.storageTank = { id: createSensorDto.storageTankId } as StorageTank;
    return this.sensorRepository.save(sensor);
  }

  findAll() {
    return this.sensorRepository.find({ relations: ['sensorRecords'] });
  }


  async findOne(id: number) {
    const sensor = await this.sensorRepository.findOne({ where: { id } });

    if (!sensor) {
      const errorMessage = this.i18n.translate('error.SENSOR.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }
    return sensor;
  }

  async findOneByKey(connectionKey: string) {
    const sensor = await this.sensorRepository.findOne({ where: { connectionKey }, relations: ['storageTank'] });

    if (!sensor) {
      const errorMessage = this.i18n.translate('error.SENSOR.NOT_FOUND_BY_KEY');
      throw new NotFoundException(errorMessage);
    }
    return sensor;
  }

  async update(id: number, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return this.sensorRepository.save(sensor);
  }

  async remove(id: number) {
    const sensor = await this.findOne(id);
    return this.sensorRepository.remove(sensor);
  }

  async updateOccupancyPercentage(storageTankId: number, occupancyPercentage: number) {
    await this.storageTankService.update(storageTankId, { occupancyPercentage });
  }
}
