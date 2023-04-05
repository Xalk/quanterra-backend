import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {

  @IsString()
  title: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  shipId: number;
}
