import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { CrewMembersModule } from '@/core/crew-members/crew-members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ship]), CrewMembersModule],
  controllers: [ShipsController],
  providers: [ShipsService],
  exports: [ShipsService]
})
export class ShipsModule {}
