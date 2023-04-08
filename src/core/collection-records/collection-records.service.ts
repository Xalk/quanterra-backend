import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionRecordDto } from './dto/create-collection-record.dto';
import { UpdateCollectionRecordDto } from './dto/update-collection-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionRecord } from '@/core/collection-records/entities/collection-record.entity';
import { Repository } from 'typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { StorageTankService } from '@/core/storage-tank/storage-tank.service';

@Injectable()
export class CollectionRecordsService {

  constructor(
    @InjectRepository(CollectionRecord) private repo: Repository<CollectionRecord>,
    private readonly storageTankService: StorageTankService,
  ) {
  }

  async create(createCollectionRecordDto: CreateCollectionRecordDto) {
    const collectionRecord = this.repo.create(createCollectionRecordDto);

    const storageTank = await this.storageTankService.findOne(createCollectionRecordDto.storageTankId);

    if (storageTank.currentLevel === 0) {
      throw new HttpException('The storage tank is currently empty', HttpStatus.CONFLICT);
    }

    collectionRecord.treatedAmount = storageTank.currentLevel;
    collectionRecord.unit = storageTank.unit;
    collectionRecord.storageTank = { id: createCollectionRecordDto.storageTankId } as StorageTank;


    await this.storageTankService.update(storageTank.id, { currentLevel: 0 });
    return this.repo.save(collectionRecord);
  }

  findAll() {
    return this.repo.find({ relations: ['storageTank'] });
  }

  async findOne(id: number) {
    const record = await this.repo.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateCollectionRecordDto: UpdateCollectionRecordDto) {
    const record = await this.repo.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    Object.assign(record, updateCollectionRecordDto);

    return this.repo.save(record);
  }

  async remove(id: number) {
    const record = await this.repo.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return this.repo.remove(record);
  }

  async getAvgByMonth(){
    const startOfMonth = new Date();
    startOfMonth.setMonth(startOfMonth.getMonth() - 5);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setHours(23, 59, 59, 999);

    const result = await this.repo.createQueryBuilder('collection_record')
      .select(`DATE_TRUNC('month', collection_record."createdAt") AS month`)
      .addSelect('SUM(collection_record."treatedAmount") FILTER (WHERE collection_record."unit" = \'kg\')', 'kg')
      .addSelect('SUM(collection_record."treatedAmount") FILTER (WHERE collection_record."unit" = \'liters\')', 'liters')
      .where('collection_record."createdAt" >= :startOfMonth', { startOfMonth })
      .andWhere('collection_record."createdAt" <= :endOfMonth', { endOfMonth })
      .groupBy('month')
      .orderBy('month')
      .getRawMany();


    const formattedResult = result.reduce((acc, { month, kg, liters }) => {
      const formattedMonth = month.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
      acc[formattedMonth] = {
        kg: kg,
        liters: liters
      };
      return acc;
    }, {});


    return formattedResult;
  }
}
