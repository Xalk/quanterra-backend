import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Entity()
export class Waste extends CustomBaseEntity {

  @Column()
  type: string;

  @Column()
  description: string;

  @OneToMany(type => StorageTank, storageTank => storageTank.waste)
  storageTanks: StorageTank[];
}
