import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Injectable()
export class SensorsService {

  constructor(@InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
              private readonly i18n: I18nRequestScopeService,
              ) {
  }

  create(createSensorDto: CreateSensorDto) {
    const sensor = this.sensorRepository.create(createSensorDto);
    return this.sensorRepository.save(sensor);
  }

  findAll() {
    return this.sensorRepository.find({ relations: ['sensorRecords'] });
  }


  async findOne(id: number) {
    const sensor = await this.sensorRepository.findOne({ where: { id } });

    if (!sensor) {
      const errorMessage = this.i18n.translate('error.SENSOR.NOT_FOUND' );
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
}
