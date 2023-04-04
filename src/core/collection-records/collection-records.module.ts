import { Module } from '@nestjs/common';
import { CollectionRecordsService } from './collection-records.service';
import { CollectionRecordsController } from './collection-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRecord } from '@/core/collection-records/entities/collection-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionRecord])],
  controllers: [CollectionRecordsController],
  providers: [CollectionRecordsService]
})
export class CollectionRecordsModule {}
