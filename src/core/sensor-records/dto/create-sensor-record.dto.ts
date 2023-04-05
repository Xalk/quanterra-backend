import { IsNumber } from 'class-validator';

export class CreateSensorRecordDto {

  @IsNumber()
  distance: number;

  @IsNumber()
  sensorId: number;
}
