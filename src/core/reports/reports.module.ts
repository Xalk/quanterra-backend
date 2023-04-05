import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '@/core/reports/entities/report.entity';
import { ShipsModule } from '@/core/ships/ships.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), ShipsModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
