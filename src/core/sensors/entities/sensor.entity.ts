import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SensorRecord } from '@/core/sensor-records/entities/sensor-record.entity';

@Entity()
export class Sensor extends CustomBaseEntity{

  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany(() => SensorRecord, sensorRecord => sensorRecord.sensor)
  sensorRecords: SensorRecord[];

}
