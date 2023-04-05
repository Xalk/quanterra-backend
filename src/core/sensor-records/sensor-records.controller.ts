import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorRecordsService } from './sensor-records.service';
import { CreateSensorRecordDto } from './dto/create-sensor-record.dto';
import { UpdateSensorRecordDto } from './dto/update-sensor-record.dto';

@Controller('sensor-records')
export class SensorRecordsController {
  constructor(private readonly sensorRecordsService: SensorRecordsService) {}

  @Post()
  create(@Body() createSensorRecordDto: CreateSensorRecordDto) {
    return this.sensorRecordsService.create(createSensorRecordDto);
  }

  @Get()
  findAll() {
    return this.sensorRecordsService.findAll();
  }

}