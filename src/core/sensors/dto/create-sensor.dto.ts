import { IsString } from 'class-validator';

export class CreateSensorDto {

  @IsString()
  name: string;

  @IsString()
  status: string;
}
