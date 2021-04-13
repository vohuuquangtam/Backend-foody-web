import {Ecate} from '../../../common/enums/productCateogory.enum';
import {Categories} from '../../../categories/categories.entity';
import {Product} from '../../../products/product.entity';

export class ProductHelper {
    private _data : Product[];

    constructor (productcategory: Categories[]){
        this._data = this.getData(productcategory);
    }

    private getData(productcategory: Categories[]): any[]{
        return [
            Product.create({
                name: 'Cơm bà Nhi',
                image: ["https://thedisneyblog.com/wp-content/uploads/2017/03/avatar-land-food-1.jpg"],
                price: 500000,
                description: 'Ngon bổ rẻ',
                quantity: 20,
                category: productcategory.filter(item => item.name === Ecate.MEAT)
            })
        ];
    }
    public initProduct(): Promise<Product[]> {
        return Promise.all(this._data.map(product => product.save()));
      }
    }