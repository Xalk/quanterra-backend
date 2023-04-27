import { Controller, Get, Post, Body} from '@nestjs/common';
import { SensorRecordsService } from './sensor-records.service';
import { CreateSensorRecordDto } from './dto/create-sensor-record.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@Controller('sensor-records')
@ApiTags('sensor-records')
export class SensorRecordsController {
  constructor(private readonly sensorRecordsService: SensorRecordsService) {}

  @Post()
  @ApiBody({ type: CreateSensorRecordDto })
  create(@Body() createSensorRecordDto: CreateSensorRecordDto) {
    return this.sensorRecordsService.create(createSensorRecordDto);
  }

  @Get()
  findAll() {
    return this.sensorRecordsService.findAll();
  }

}
