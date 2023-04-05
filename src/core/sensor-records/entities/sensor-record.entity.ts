import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Sensor } from '@/core/sensors/entities/sensor.entity';

@Entity()
export class SensorRecord extends CustomBaseEntity {

  @Column()
  distance: number;

  @ManyToOne(() => Sensor, sensor => sensor.sensorRecords)
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;

}
