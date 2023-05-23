import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { CrewMembersModule } from '@/core/crew-members/crew-members.module';
import { AuthModule } from '@/core/auth/auth.module';
import { EmailService } from '@/core/crew-members/email.service';
import { CollectionRecordsModule } from '@/core/collection-records/collection-records.module';


@Module({
  imports: [TypeOrmModule.forFeature([Ship]), CrewMembersModule, AuthModule, CollectionRecordsModule],
  controllers: [ShipsController],
  providers: [ShipsService, EmailService],
  exports: [ShipsService]
})
export class ShipsModule {}
