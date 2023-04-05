import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '@/common/enums/role.enum';
import { Exclude } from 'class-transformer';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';
import { Report } from '@/core/reports/entities/report.entity';
import { UserLog } from '@/core/user-logs/entities/user-log.entity';


@Entity()
export class User extends CustomBaseEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: Role.ADMIN })
  role: Role;

  @OneToMany(type => CrewMember, crewMember => crewMember.user)
  crewMember: CrewMember[];

  @OneToMany(type => Report, report => report.user)
  reports: Report[];

  @OneToMany(type => UserLog, userLog => userLog.user)
  userLogs: UserLog[];
}
