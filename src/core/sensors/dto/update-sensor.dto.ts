import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  status: string;
}
