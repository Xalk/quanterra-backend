import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';
import { StorageTank } from '@/core/storage-tank/entities/storage-tank.entity';
import { Report } from '@/core/reports/entities/report.entity';

@Entity()
export class Ship extends CustomBaseEntity {

  @Column()
  shipName: string;

  @Column()
  shipType: string;

  @Column()
  buildYear: number;

  @OneToMany(type => CrewMember, crewMember => crewMember.ship)
  crewMember: CrewMember[];

  @OneToMany(type => StorageTank, tank => tank.ship)
  storageTanks: StorageTank[];

  @OneToMany(type => Report, report => report.ship)
  reports: Report[];
}
