import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageTankDto } from './create-storage-tank.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStorageTankDto extends PartialType(CreateStorageTankDto) {


  @IsNumber()
  @IsOptional()
  sensorId?: number;
}
