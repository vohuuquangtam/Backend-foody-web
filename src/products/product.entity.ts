import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '../categories/categories.entity';
import { Reviews } from '../reviews/review.entity';
@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column("text", { array: true, nullable: true })
  image: string[];

  @Column()
  price: number;

  // @ApiProperty({ writeOnly: true, example: [1, 4] })
  // @IsOptional()
  // @IsNumber({}, { each: true })
  // categoryID: Array<number>;

  @Column()
  description: string;

  @Column()
  quantity: number;

  reviewID: number;

  //relation
  //  @ApiProperty()
  @ManyToMany(
    () => Categories,
    categories => categories.product, { nullable: false ,onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  category: Categories[];
  // @ManyToMany(() => Categories)

  @OneToMany(()=> Reviews,
   review => review.product,
  )

  review : Reviews[];

 
}
