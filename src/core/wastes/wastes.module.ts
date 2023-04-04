import { Module } from '@nestjs/common';
import { WastesService } from './wastes.service';
import { WastesController } from './wastes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waste } from '@/core/wastes/entities/waste.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Waste])],
  controllers: [WastesController],
  providers: [WastesService]
})
export class WastesModule {}
