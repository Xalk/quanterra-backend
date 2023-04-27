import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageTankDto } from './create-storage-tank.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStorageTankDto extends PartialType(CreateStorageTankDto) {

  @ApiProperty()
  unit?: string;

  @ApiProperty()
  capacity?: number;

  @ApiProperty()
  occupancyPercentage?: number;

  @ApiProperty()
  shipId?: number;

  @ApiProperty()
  wasteId?: number;

  @ApiProperty()
  sensorId?: number;
}
