import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionRecordDto } from './create-collection-record.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCollectionRecordDto extends PartialType(CreateCollectionRecordDto) {
  @ApiProperty()
  description: string;

  @ApiProperty()
  storageTankId: number;
}
