import { Injectable } from '@nestjs/common';
import {Categories} from './categories.entity';
import {CategoriesRespository} from './categories.repository';
import {Product} from 'src/products/product.entity';
@Injectable()
export class CategoriesService {
    constructor(private readonly categorisRepository: CategoriesRespository){}

    async getCate(req : any) : Promise<Categories[]>{
        const {name} = await req;
        if (name){
            return this.categorisRepository.find({
              where : {name:name},
              relations: ['product']
            });
          } 
    }

    async creatCate(category:Categories) : Promise<Categories>{
        const cateAdd = new Categories();
        cateAdd.name = category.name;
        cateAdd.save();
        return category;
    }
    async updateCate(id: number, category: Categories): Promise<Categories> {
        this.categorisRepository.update(id, category);
        return this.categorisRepository.findOne({ where: {id}});
    }

    async deleteCate(id: number): Promise<void> {
        this.categorisRepository.delete(id);
    }

}
