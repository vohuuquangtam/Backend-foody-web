import { Product } from '../products/product.entity';
import { Entity, Column, ManyToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //relation
    @ManyToMany(() => Product, product => product.category )
    product : Product[]
}