import { CustomBaseEntity } from '@/common/entity/custom-base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@/core/users/entities/user.entity';

@Entity()
export class UserLog extends CustomBaseEntity{

  @Column()
  isAutomated: boolean;

  @Column({nullable: true})
  method: string;

  @Column({nullable: true})
  route: string;

  @Column({nullable: true})
  action: string;

  @ManyToOne(() => User, user => user.userLogs)
  @JoinColumn({name: 'user_id'})
  user: User;
}
