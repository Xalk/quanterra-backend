import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('sensors')
@ApiTags('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {
  }

  @Post()
  @ApiBody({ type: CreateSensorDto })
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get('by-id/:id')
  getOne(@Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Get('by-key/:key')
  getOneByKey(@Param('key') key: string) {
    return this.sensorsService.findOneByKey(key);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSensorDto })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Patch('/update-percentage/:storageTankId')
  updatePercentage(@Param('storageTankId') storageTankId: string, @Body() body: { occupancyPercentage: number }) {
    return this.sensorsService.updateOccupancyPercentage(+storageTankId, body.occupancyPercentage);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }

}
