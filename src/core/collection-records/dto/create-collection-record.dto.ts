import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionRecordDto {

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  storageTankId: number;
}
