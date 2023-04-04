import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensorsService {

  constructor(@InjectRepository(Sensor) private sensorRepository: Repository<Sensor>) {
  }

  create(createSensorDto: CreateSensorDto) {
    const sensor = this.sensorRepository.create(createSensorDto);
    return this.sensorRepository.save(sensor);
  }

  findAll() {
    return this.sensorRepository.find();
  }


  async update(id: number, updateSensorDto: UpdateSensorDto) {
    const sensor = await this.sensorRepository.findOne({ where: { id } });

    if (!sensor) {
      throw new NotFoundException('Sensor not found');
    }

    Object.assign(sensor, updateSensorDto);

    return this.sensorRepository.save(sensor);
  }

  async remove(id: number) {
    const sensor = await this.sensorRepository.findOne({ where: { id } });

    if (!sensor) {
      throw new NotFoundException('Sensor not found');
    }

    return this.sensorRepository.remove(sensor);
  }
}
