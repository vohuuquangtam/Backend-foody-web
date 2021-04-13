import { Repository, EntityRepository, In } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Categories } from 'src/categories/categories.entity';

@EntityRepository(Product)
export class ProductRespository extends Repository<Product> {
  async createProduct(CreateProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      image,
      price,
      description,
      quantity,
      category,
    } = CreateProductDto;

    const product = new Product();
    product.name = name;
    product.image = image;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.category = await Categories.find({
      where: { name: In([category]) },
    });
    await product.save();

    return product;
  }
}
