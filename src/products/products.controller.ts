import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller()
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('products')
  getProduct(@Query() req): Promise<Product[]> {
    return this.productService.getProducts(req);
  }

  //@Get('products/:id')
  //getProductbyId(@Param('id') id: number): Promise<Product> {
   // return this.productService.getProductByID(id);
 // }

  @Post('products/create')
  @Auth('PRODUCT_CREATE')
  @UsePipes(ValidationPipe)
  createProducts(@Body() CreateProductDto: CreateProductDto) {
    return this.productService.createProduct(CreateProductDto);
  }

  @Put('products/:id')
  @Auth('PRODUCT_UPDATE')
  updateProduct(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete('products/:id')
  @Auth('PRODUCT_DELETE')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
