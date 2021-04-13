import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { PermissionRespository } from './permissions.repository';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRespository])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
