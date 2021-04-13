import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
    ManyToOne,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import {User} from '../users/user.entity';
  import {Product} from '../products/product.entity';
@Entity('reviews')
export class Reviews extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;

    userId: number;

    @ManyToOne(
        () => User,
        user => user.review,
    )
    user : User;

    productId: number;

    @ManyToOne(
        () => Product,
        product =>product.review ,
    )
    product : Product;
    
    @Column({nullable: true})
    deleted_at : Date;
}
