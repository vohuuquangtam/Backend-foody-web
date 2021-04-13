import { Injectable, ExecutionContext, CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/user.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UsersService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const permission = await this.reflector.get('roles', context.getHandler());
        const token = req && req.headers.authorization;
        
        if (!token || token.split(' ')[0] !== "Bearer") {
            throw new HttpException('Token Fail', HttpStatus.FORBIDDEN)
        }
        
        try {
            const decode = jwt.verify(token.split(' ')[1], 'cnpm17tclc1');
            const user = await this.userService.getUserById(decode.userID);
            req.user = user;
            if (permission === '' && user) return true;  
            return this.checkPermission(user, permission);
        } catch {
            throw new HttpException('Token Fail', HttpStatus.FORBIDDEN)
        }
    }

    checkPermission(user: User, permissionReq: string) {
        return user.role.permissions.some(permission => {
            if (permission.name === "ALL") return true;
            if (permission.name === permissionReq) return true;
            return false;
        })
    }
}
