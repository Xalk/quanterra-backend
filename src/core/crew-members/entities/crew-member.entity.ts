import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';
import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Ship } from '@/core/ships/entities/ship.entity';

@Entity()
export class CrewMember extends CustomBaseEntity {


  @ManyToOne(() => User, user => user.crewMember)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ship, ship => ship.crewMember)
  @JoinColumn({ name: 'ship_id' })
  ship: Ship;

  @Column()
  desc: string;
}
