import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Permission } from '../permissions/permission.entity';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * Map relation keys
   */
  @ApiProperty({ writeOnly: true, example: [2, 3] })
  @IsOptional()
  @IsNumber({}, { each: true })
  permissionIds: Array<number>;

  /**
   * Relations
   */
  @ApiProperty({ readOnly: true })
  @ManyToMany(
    () => Permission,
    permission => permission.role,
  )
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @ApiProperty({ readOnly: true })
  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];
}