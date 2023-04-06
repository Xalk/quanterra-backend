import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';

@Entity()
export class Sensor extends CustomBaseEntity {

  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany(() => SensorRecord, sensorRecord => sensorRecord.sensor)
  sensorRecords: SensorRecord[];

  @OneToOne(() => StorageTank, storageTank => storageTank.sensor)
  storageTank: StorageTank;

}
