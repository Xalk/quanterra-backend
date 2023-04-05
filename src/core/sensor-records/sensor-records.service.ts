import { Injectable } from '@nestjs/common';
import { CreateSensorRecordDto } from './dto/create-sensor-record.dto';
import { UpdateSensorRecordDto } from './dto/update-sensor-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';
import { Repository } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';

@Injectable()
export class SensorRecordsService {

  constructor(@InjectRepository(SensorRecord) private sensorRecordRepository: Repository<SensorRecord>) {
  }

  create(createSensorRecordDto: CreateSensorRecordDto) {
    const sensorRecord = this.sensorRecordRepository.create(createSensorRecordDto);
    sensorRecord.sensor = { id: createSensorRecordDto.sensorId } as Sensor;
    return this.sensorRecordRepository.save(sensorRecord);
  }

  findAll() {
    return this.sensorRecordRepository.find({ relations: ['sensor'] });
  }

}
