import { Global, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { AppGateway } from '@/core/socket/app.gateway';
import { StorageTankSubscriber } from '@/core/socket/storage-tank.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StorageTank])],
  providers: [SocketService, StorageTankSubscriber, AppGateway],
  exports: [SocketService],
})
export class SocketModule {}
