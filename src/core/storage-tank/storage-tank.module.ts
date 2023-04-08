import { Module } from '@nestjs/common';
import { StorageTankService } from './storage-tank.service';
import { StorageTankController } from './storage-tank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StorageTank])],
  controllers: [StorageTankController],
  providers: [StorageTankService],
  exports: [StorageTankService],
})
export class StorageTankModule {}
