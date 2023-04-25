import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStorageTankDto {

  @IsString()
  unit: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  occupancyPercentage: number;

  @IsNumber()
  shipId: number;

  @IsNumber()
  wasteId: number;

  @IsNumber()
  @IsOptional()
  sensorId: number;
}
