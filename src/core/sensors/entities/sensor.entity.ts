import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Sensor extends CustomBaseEntity{

  @Column()
  status: string;

}
