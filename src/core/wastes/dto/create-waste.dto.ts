import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWasteDto {

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  description: string;

}
