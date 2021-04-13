import { Injectable } from '@nestjs/common';
import { Permission } from 'src/permissions/permission.entity';
import { Role } from './role.entity';
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRole(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async createRole(roleAdd: Role): Promise<Role> {
    const permissions = await Permission.find();
    const perArr: Permission[] = [];
    roleAdd.permissionIds.map(role => permissions.map(permission => {
        if(permission.id === role) {
            perArr.push(permission)
        }
    }))
    const role = new Role();
    role.name = roleAdd.name;
    role.permissions = perArr;
    await role.save();
    return role;
  }
}
