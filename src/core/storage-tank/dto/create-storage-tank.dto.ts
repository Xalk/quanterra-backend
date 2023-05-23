import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageTankDto {

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  occupancyPercentage: number;

  @ApiProperty()
  @IsNumber()
  shipId: number;

  @ApiProperty()
  @IsNumber()
  wasteId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sensorId: number;
}
