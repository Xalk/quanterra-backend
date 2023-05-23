import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from '@/core/reports/entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';
import { Ship } from '@/core/ships/entities/ship.entity';
import { ShipsService } from '@/core/ships/ships.service';

@Injectable()
export class ReportsService {

  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>,
              private readonly shipService: ShipsService) {
  }

  async create(createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    report.user = { id: createReportDto.userId } as User;
    report.ship = { id: createReportDto.shipId } as Ship;

    const total = await this.shipService.calcTotalCapacity(createReportDto.shipId);
    report.totalWasteCapacity = total;

    const savedReport = await this.reportRepository.save(report);

    return this.findOne(savedReport.id);
  }

  async findOne(id: number) {
    const record = await this.reportRepository.findOne({
      where: { id },
      relations: { user: true, ship: { storageTanks: true } },
    });

    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  findAll() {
    return this.reportRepository.find({
      relations: {
        user: true,
        ship: { crewMember: true, storageTanks: { collectionRecords: true } },
      },
    });
  }

}
