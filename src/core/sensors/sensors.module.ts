import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';
import { StorageTankModule } from '@/core/storage-tank/storage-tank.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), StorageTankModule],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService]
})
export class SensorsModule {
}
