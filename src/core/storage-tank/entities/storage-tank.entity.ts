import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Ship } from '@/core/ships/entities/ship.entity';
import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Waste } from '@/core/wastes/entities/waste.entity';
import { CollectionRecord } from '@/core/collection-records/entities/collection-record.entity';

@Entity()
export class StorageTank extends CustomBaseEntity {

  @Column()
  unit: string;

  @Column()
  capacity: number;

  @Column()
  currentLevel: number;

  @ManyToOne(() => Ship, ship => ship.storageTanks)
  @JoinColumn({ name: 'ship_id' })
  ship: Ship;

  @ManyToOne(() => Waste, waste => waste.storageTanks)
  @JoinColumn({ name: 'waste_id' })
  waste: Waste;

  // @OneToOne(() => Sensor, sensor => sensor.storageTank)
  // sensor: Sensor

  @OneToOne(() => CollectionRecord, collectionRecord => collectionRecord.storageTank)
  collectionRecord: CollectionRecord;
}
