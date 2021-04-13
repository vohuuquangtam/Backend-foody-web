import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from './role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @Get()
    getAllRole(): Promise<Role[]> {
        return this.roleService.getRole();
    }

    @Post()
    createRole(@Body() role: Role): Promise<Role> {
        return this.roleService.createRole(role);
    }
}
