import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';

@Entity()
export class Ship extends CustomBaseEntity {

  @Column()
  shipName: string;

  @Column()
  shipType: string;

  @Column()
  buildYear: number;

  @OneToMany(type=> CrewMember, crewMember => crewMember.ship)
  crewMember: CrewMember[]

}
