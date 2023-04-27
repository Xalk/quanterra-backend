import { PartialType } from '@nestjs/mapped-types';
import { CreateShipDto } from './create-ship.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShipDto extends PartialType(CreateShipDto) {
  @ApiProperty({ default: 'Titanic' })
  shipName: string;

  @ApiProperty()
  shipType: string;

  @ApiProperty()
  buildYear: number;
}
