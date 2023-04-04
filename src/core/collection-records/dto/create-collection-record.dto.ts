import { IsNumber, IsString } from 'class-validator';

export class CreateCollectionRecordDto {

  @IsString()
  description: string;

  @IsNumber()
  storageTankId: number;
}
