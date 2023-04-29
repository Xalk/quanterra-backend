import { Connection, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { AppGateway } from '@/core/socket/app.gateway';

@Injectable()
export class StorageTankSubscriber implements EntitySubscriberInterface<StorageTank> {

  constructor(
    @InjectConnection()
    readonly connection: Connection,
    private appGateway: AppGateway,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return StorageTank;
  }

  async afterUpdate(event: UpdateEvent<StorageTank>): Promise<any> {
    const occupancyPercentageGotUpdated = event.updatedColumns.find(column => column.propertyName === 'occupancyPercentage');
    if (occupancyPercentageGotUpdated) {
      const storageTankId = event.entity.id;
      const newOccupancyPercentage = event.entity.occupancyPercentage;
      const oldOccupancyPercentage = event.databaseEntity.occupancyPercentage;

      Logger.log(`Percentage changed from ${oldOccupancyPercentage} to ${newOccupancyPercentage}`, 'Occupancy Percentage Updated');

      // Emit updated occupancy percentage to the client only if the updated storage tank ID matches the client's subscribed ID
      this.appGateway.server.to(`tank-${storageTankId}`).emit('tank', newOccupancyPercentage);
    }
  }


}