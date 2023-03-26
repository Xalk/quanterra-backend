import { CustomBaseEntity } from '../../../common/entity/custom-base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../../../common/enums/role.enum';


@Entity()
export class User extends CustomBaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: Role.CREW_MEMBER})
  role: Role
}
