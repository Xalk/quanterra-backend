import { PartialType } from '@nestjs/mapped-types';
import { CreateWasteDto } from './create-waste.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateWasteDto extends PartialType(CreateWasteDto) {

  @ApiProperty()
  type: string;

  @ApiProperty()
  description: string;
}
