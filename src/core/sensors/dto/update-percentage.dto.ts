import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdatePercentageDto {
  @ApiProperty()
  @IsNumber()
  occupancyPercentage: number;
}
