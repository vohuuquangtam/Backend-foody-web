import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRespository} from './product.repository';
import { UsersModule } from 'src/users/users.module';
 
@Module({
  imports:[TypeOrmModule.forFeature([ProductRespository]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
