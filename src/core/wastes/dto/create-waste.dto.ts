import { IsString } from 'class-validator';

export class CreateWasteDto {

  @IsString()
  type: string;

  @IsString()
  description: string;

}
