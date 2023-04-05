import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';
import { Ship } from '@/core/ships/entities/ship.entity';

@Entity()
export class Report extends CustomBaseEntity {

  @Column()
  title: string;

  @Column()
  totalWasteCapacity: number;

  @ManyToOne(() => User, user => user.reports)
  user: User

  @ManyToOne(() => Ship, ship => ship.reports)
  ship: Ship
}
