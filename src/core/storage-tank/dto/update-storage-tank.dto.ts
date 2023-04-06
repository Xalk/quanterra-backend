import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageTankDto } from './create-storage-tank.dto';
import { IsNumber } from 'class-validator';

export class UpdateStorageTankDto extends PartialType(CreateStorageTankDto) {

  @IsNumber()
  sensorId: number;
}
