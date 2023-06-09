import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNumber()
  storageTankId: number;
}
