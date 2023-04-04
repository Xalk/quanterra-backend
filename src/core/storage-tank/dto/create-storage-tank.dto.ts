import { IsNumber, IsString } from 'class-validator';

export class CreateStorageTankDto {

  @IsString()
  unit: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  currentLevel: number;

  @IsNumber()
  shipId: number;

  @IsNumber()
  wasteId: number;
}
