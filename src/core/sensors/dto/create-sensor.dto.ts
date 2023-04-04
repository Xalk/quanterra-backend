import { IsString } from 'class-validator';

export class CreateSensorDto {

  @IsString()
  status: string;
}
