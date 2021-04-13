import { ERole } from '../../common/enums/role.enum';
import { Role } from '../../roles/role.entity';
import { enumToArray } from '../../utils/array';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { RaclHelper } from './seed-helper/racl.helper';
import { UserHelper } from './seed-helper/user.helper';
import { User } from '../../users/user.entity';
import { ProductHelper } from './seed-helper/product.helper';
import { Ecate } from '../../common/enums/productCateogory.enum';
import { Categories } from '../../categories/categories.entity';
import { Product } from '../../products/product.entity';

export default class Seed implements Seeder {
  private initRole(roles: ERole[]) {
    return Promise.all(
      roles.map(role => {
        const dto = Role.create();
        dto.name = role;
        return dto.save();
      }),
    );
  }

  private initCategory(categories: Ecate[]) {
    return Promise.all(
      categories.map(category => {
        const dto = Categories.create();
        dto.name = category;
        return dto.save();
      }),
    );
  }

  private randomUser(factory: Factory, role: Role) {
    return factory(User)({ role, password: '12345678' }).createMany(5);
  }
  private randomProduct(factory: Factory, cate: Categories[]) {
  //  return factory(Product)({ cate }).createMany(10);
  }

  public async run(factory: Factory, connection: Connection) {
    try {
      await this.initRole(enumToArray(ERole));
      const roleEntities = await Role.find();

      const permissionHelper = new RaclHelper();
      await permissionHelper.assignPermissionsToRoles(roleEntities);

      const userHelper = new UserHelper(roleEntities);
      await userHelper.initUser();

      const userRole: Role = roleEntities.find(
        role => role.name === ERole.USER,
      );
      await this.randomUser(factory, userRole);

      await this.initCategory(enumToArray(Ecate));
      const cateEntities = await Categories.find();

      const productHelper = new ProductHelper(cateEntities);
      await productHelper.initProduct();

      const categoryFriedfood: Categories[] = cateEntities.filter(
        cate => cate.name === Ecate.FRIEDFOOD,
      );
      const categorymeat: Categories[] = cateEntities.filter(
        cate => cate.name === Ecate.MEAT,
      );
      
      // [categories { id: 4, name: MEAT}]
      await factory(Product)({ productCategory: categoryFriedfood }).createMany(10);
      await factory(Product)({ productCategory: categorymeat }).createMany(10);
    } catch (err) {
      throw err;
    }
  }
}
