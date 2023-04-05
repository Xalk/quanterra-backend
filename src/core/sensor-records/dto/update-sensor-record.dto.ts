import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorRecordDto } from './create-sensor-record.dto';

export class UpdateSensorRecordDto extends PartialType(CreateSensorRecordDto) {}
