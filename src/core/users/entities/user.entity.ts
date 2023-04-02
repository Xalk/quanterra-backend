import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '@/common/enums/role.enum';
import { Exclude } from 'class-transformer';
import { CrewMember } from '@/core/crew-members/entities/crew-member.entity';


@Entity()
export class User extends CustomBaseEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({default: Role.ADMIN})
  role: Role

  @OneToMany(type=> CrewMember, crewMember => crewMember.user)
  crewMember: CrewMember[]
}
