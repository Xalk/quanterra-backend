import { Module } from '@nestjs/common';
import { SensorRecordsService } from './sensor-records.service';
import { SensorRecordsController } from './sensor-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorRecord])],
  controllers: [SensorRecordsController],
  providers: [SensorRecordsService]
})
export class SensorRecordsModule {}
