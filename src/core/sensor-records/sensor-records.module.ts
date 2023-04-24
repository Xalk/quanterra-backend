import { Module } from '@nestjs/common';
import { SensorRecordsService } from './sensor-records.service';
import { SensorRecordsController } from './sensor-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';
import { SensorsModule } from '@/core/sensors/sensors.module';

@Module({
  imports: [TypeOrmModule.forFeature([SensorRecord]), SensorsModule],
  controllers: [SensorRecordsController],
  providers: [SensorRecordsService]
})
export class SensorRecordsModule {}
