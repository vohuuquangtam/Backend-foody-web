import { Role } from '../roles/role.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsOptional } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Orders } from '../orders/orders.entity';
import {Reviews} from '../reviews/review.entity';
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  dayOfBirth: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  roleId: number;

  reviewId: number;

  @BeforeUpdate()
  @BeforeInsert()
  hashPwd() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(()=> Orders,
  order => order.user,
  )
  order : Orders[];

  @OneToMany(() => Reviews,
  review => review.user,
   )
   review : Reviews[];
}
