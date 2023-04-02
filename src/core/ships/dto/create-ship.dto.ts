import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShipDto {
  @IsNotEmpty()
  @IsString()
  shipName: string;

  @IsNotEmpty()
  @IsString()
  shipType: string;

  @IsNotEmpty()
  @IsNumber()
  buildYear: number;
}
