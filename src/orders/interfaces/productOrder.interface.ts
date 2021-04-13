import { Product } from 'src/products/product.entity';

export interface ProductOrder {
  product: Product;
  quantity: number;
}
