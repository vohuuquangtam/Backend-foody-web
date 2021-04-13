import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRespository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/categories.entity';
import { In } from 'typeorm';
import {CategoriesService} from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRespository)
    private productRepository: ProductRespository,
  ) {}

  async getProducts(req : any): Promise<Product[]> {
    const {category,id} = await req;
  
    if (id){
      return this.productRepository.find({
        where : {id},
        relations: ['category'],
      });
    } 
    const products = await this.productRepository.find({ relations: ['category'] });
    await products.sort((a, b) => a.id - b.id)
    return products;
  }

  async getProductByID(id: number): Promise<Product> {
    const product = this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }

    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  async updateProduct(
    id: number,
    product: UpdateProductDto,
  ): Promise<Product> {
    const found = await this.getProductByID(id);
    if (!found) {
      throw new NotFoundException(
        `Product with ${id} not found. You can't update`,
      );
    }
    const categories: Categories[] = await this.findCategory(product.category);
    found.name = product.name ?? found.name;
    found.image = product.image ?? found.image;
    found.category = categories;
    found.description = product.description ?? found.description;
    found.quantity = product.quantity ?? found.quantity;
    found.price = product.price ?? found.price;
    await found.save();
    return this.getProductByID(id);
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with "${id}" not found`);
    }
  }

  findCategory(category: string): Promise<Categories[]> {
    return Categories.find({
      where: {
        name: In([category])
      }
    })
  }
}
