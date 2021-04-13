import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CategoriesRespository} from './categories.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRespository])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
