import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Entity()
export class CollectionRecord extends CustomBaseEntity {

  @Column()
  description: string;

  @Column()
  treatedAmount: number;

  @Column()
  unit: string;

  @ManyToOne(type => StorageTank, storageTank => storageTank.collectionRecords)
  @JoinColumn({ name: 'storage_tank_id' })
  storageTank: StorageTank;

}
