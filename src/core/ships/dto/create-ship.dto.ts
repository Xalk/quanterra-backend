import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipDto {

  @ApiProperty({
    default: 'Titanic',
  })
  @IsNotEmpty()
  @IsString()
  shipName: string;

  @ApiProperty({
    default: 'Cruise',
  })
  @IsNotEmpty()
  @IsString()
  shipType: string;

  @ApiProperty({
    default: 1912,
  })
  @IsNotEmpty()
  @IsNumber()
  buildYear: number;
}
