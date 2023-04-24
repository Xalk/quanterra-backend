import { IsNumber, IsString } from 'class-validator';

export class CreateSensorRecordDto {

  @IsNumber()
  distance: number;

  @IsString()
  sensorKey: string;
}
