import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionRespository } from './permissions.repository';

@Injectable()
export class PermissionsService {
    constructor(private readonly permissionRepository: PermissionRespository) {}

    async getPermission(): Promise<Permission[]> {
        return this.permissionRepository.find();
    }

    async createPermission(permission: Permission): Promise<Permission> {
        const perAdd = new Permission();
        perAdd.name = permission.name;
        perAdd.save();
        return permission;
    }

    async updatePermission(id: number, permission: Permission): Promise<Permission> {
        this.permissionRepository.update(id, permission);
        return this.permissionRepository.findOne({ where: {id}});
    }

    async deletePermission(id: number): Promise<void> {
        this.permissionRepository.delete(id);
    }
}
