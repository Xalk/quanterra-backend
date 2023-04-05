import { Module } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { UserLogsController } from './user-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLog } from '@/core/user-logs/entities/user-log.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  controllers: [UserLogsController],
  providers: [UserLogsService],
  exports: [UserLogsService],
})
export class UserLogsModule {}
