import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import { } from 'class-validator';
import {User} from '../users/user.entity';
import { ProductOrder } from './interfaces/productOrder.interface';



@Entity('orders')
export class Orders extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    totalMoney: number;

    @Column()
    name_receive: string;

    @Column()
    address_receive: string;

    @Column()
    phone_receive: string;

    userID: number;

    @Column({type: 'simple-json',  nullable: true})
    orderDetail: ProductOrder[];

    @Column()
    created_at: Date;

    @Column({nullable: true})
    deleted_at: Date;

    @ManyToOne (
        () => User,
        user => user.order,
    )
    user : User;
}


