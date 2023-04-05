import { Module } from '@nestjs/common';
import { CrewMembersService } from './crew-members.service';
import { CrewMembersController } from './crew-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CrewMember])],
  controllers: [CrewMembersController],
  providers: [CrewMembersService],
  exports: [CrewMembersService],
})
export class CrewMembersModule {}
