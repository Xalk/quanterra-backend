import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Entity()
export class CollectionRecord extends CustomBaseEntity {

  @Column()
  description: string;

  @OneToOne(type => StorageTank, storageTank => storageTank.collectionRecord)
  @JoinColumn({ name: 'storage_tank_id' })
  storageTank: StorageTank;

}
