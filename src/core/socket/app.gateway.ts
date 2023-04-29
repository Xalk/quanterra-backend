import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { Repository } from 'typeorm';


@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(@InjectRepository(StorageTank) private repo: Repository<StorageTank>) {
  }

  @WebSocketServer() public server: Server;


  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }


  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('subscribe')
  async handleSubscribe(client: Socket, data: { storageTankId: number }) {
    client.join(`tank-${data.storageTankId}`);
    const storageTank = await this.repo.findOne({ where: { id: data.storageTankId } });
    this.server.to(`tank-${storageTank.id}`).emit('tank', storageTank.occupancyPercentage);
  }
}