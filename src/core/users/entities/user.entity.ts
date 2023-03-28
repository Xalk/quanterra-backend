import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '@/common/enums/role.enum';
import { Exclude } from 'class-transformer';


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
}
