import { Injectable } from '@nestjs/common';
import { CreateSensorRecordDto } from './dto/create-sensor-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';
import { Repository } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { SensorsService } from '@/core/sensors/sensors.service';

@Injectable()
export class SensorRecordsService {

  constructor(@InjectRepository(SensorRecord) private sensorRecordRepository: Repository<SensorRecord>,
              private readonly sensorsService: SensorsService,
  ) {
  }

  async create(createSensorRecordDto: CreateSensorRecordDto) {
    const sensorRecord = this.sensorRecordRepository.create(createSensorRecordDto);

    const sensor = await this.sensorsService.findOneByKey(createSensorRecordDto.sensorKey);

    sensorRecord.sensor = { id: sensor.id } as Sensor;
    return this.sensorRecordRepository.save(sensorRecord);
  }

  findAll() {
    return this.sensorRecordRepository.find({ relations: ['sensor'] });
  }

}
