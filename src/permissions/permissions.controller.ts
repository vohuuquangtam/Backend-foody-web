import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionService: PermissionsService) {}

    @Get()
    getPermission(): Promise<Permission[]> {
        return this.permissionService.getPermission();
    }

    @Post()
    createPermission(@Body() permission: Permission): Promise<Permission> {
        return this.permissionService.createPermission(permission);
    }

    @Put('/:id')
    updatePermission(@Param('id') id: number, @Body() permission: Permission): Promise<Permission> {
        return this.permissionService.updatePermission(id, permission);
    }

    @Delete('/:id')
    deletePermission(@Param('id') id: number): Promise<void> {
        return this.permissionService.deletePermission(id);
    }
}
