import { EntityRepository, Repository } from "typeorm";
import { Categories } from "./categories.entity";

@EntityRepository(Categories)
export class CategoriesRespository extends Repository<Categories> {}