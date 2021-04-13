import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {Categories } from './categories.entity';


@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoriesService){}
    
    @Get('')
    getCate(@Query()req): Promise<Categories[]> {
        return this.categoriesService.getCate(req);
    }

    @Post()
    createCate(@Body() category: Categories): Promise<Categories> {
        return this.categoriesService.creatCate(category);
    }

    @Put('/:id')
    updateCate(@Param('id') id: number, @Body() category: Categories): Promise<Categories> {
        return this.categoriesService.updateCate(id,category);
    }

    @Delete('/:id')
    deleteCate(@Param('id') id: number): Promise<void> {
        return this.categoriesService.deleteCate(id);
    }

}
