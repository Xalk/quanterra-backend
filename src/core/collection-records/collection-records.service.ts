import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionRecordDto } from './dto/create-collection-record.dto';
import { UpdateCollectionRecordDto } from './dto/update-collection-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionRecord } from '@/core/collection-records/entities/collection-record.entity';
import { Repository } from 'typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Injectable()
export class CollectionRecordsService {

  constructor(
    @InjectRepository(CollectionRecord) private repo: Repository<CollectionRecord>) {
  }

  create(createCollectionRecordDto: CreateCollectionRecordDto) {
    const collectionRecord = this.repo.create(createCollectionRecordDto);
    collectionRecord.storageTank = {id: createCollectionRecordDto.storageTankId} as StorageTank;
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
}
