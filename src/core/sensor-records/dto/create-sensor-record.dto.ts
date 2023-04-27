import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorRecordDto {

  @ApiProperty()
  @IsNumber()
  distance: number;

  @ApiProperty()
  @IsString()
  sensorKey: string;
}
