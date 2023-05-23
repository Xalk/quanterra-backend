import { Module } from '@nestjs/common';
import { CollectionRecordsService } from './collection-records.service';
import { CollectionRecordsController } from './collection-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRecord } from '@/core/collection-records/entities/collection-record.entity';
import { StorageTankModule } from '@/core/storage-tank/storage-tank.module';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionRecord]), StorageTankModule],
  controllers: [CollectionRecordsController],
  providers: [CollectionRecordsService],
  exports: [CollectionRecordsService]
})
export class CollectionRecordsModule {}
