import { EntityRepository, Repository } from "typeorm";
import { Permission } from "./permission.entity";

@EntityRepository(Permission)
export class PermissionRespository extends Repository<Permission> {}
