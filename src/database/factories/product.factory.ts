 import { define } from 'typeorm-seeding';
 import Faker from 'faker';
 import {Product} from '../../products/product.entity';
 import {Categories} from '../../categories/categories.entity';

 define(Product, (faker: typeof Faker, context: { productCategory : Categories[] }) => {
     const { productCategory } = context;

     const name = faker.name.findName();
     const image = [faker.image.food()];
     const price = faker.commerce.price();
     const description = faker.name.findName();
     const quantity = faker.random.number();
  
     const product = new Product();
     product.name = name;
     product.image = image;
     product.price = parseInt(price);
     product.description = description;
     product.quantity = parseInt(quantity);
     product.category = productCategory;
  
     return product;
   });

