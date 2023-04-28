import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({cors: true})
export class StorageTankGateway {
  @WebSocketServer() server: Server;
  private intervalId;
  private prevOccupancyPercentage = -1;

  constructor(@InjectRepository(StorageTank) private repo: Repository<StorageTank>) {
  }


  handleDisconnect() {
    clearInterval(this.intervalId);
    this.prevOccupancyPercentage = -1;
  }

  @SubscribeMessage('tank')
  handleSetTankLevel(@MessageBody() tankId: number) {
    this.intervalId = setInterval(async () => {
      const tank = await this.repo.findOne({where: {id: tankId}});
      if(tank.occupancyPercentage !== this.prevOccupancyPercentage){
        this.server.emit('tank', tank.occupancyPercentage);
      }
      this.prevOccupancyPercentage = tank.occupancyPercentage;
    }, 1000);
  }


}