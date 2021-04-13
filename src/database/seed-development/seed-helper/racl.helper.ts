import { enumToArray } from '../../../utils/array';
import { flatMap, remove } from 'lodash';
import { In } from 'typeorm';
import { TRacl } from '../../../common/types/t.Racl';
import { ERole } from '../../../common/enums/role.enum';
import {
  ECrudAction,
  ECrudFeature,
} from '../../../common/enums/crudAction.enum';
import { Permission } from '../../../permissions/permission.entity';
import { Role } from '../../../roles/role.entity';
import { TCrudAction } from '../../../common/types/t.CrudAction';

export class RaclHelper {
  private _racls: Array<TRacl>;

  constructor() {
    this._racls = this.getRacls();
  }

  private getRacls(): Array<TRacl> {
    return [
      {
        role: ERole.ADMIN,
        permissions: ['ALL'],
      },
      {
        role: ERole.MOD,
        permissions: flatMap([
          ...this.createManyPermissionFromFeature(ECrudFeature.PRODUCT),
          ...this.createManyPermissionFromFeature(ECrudFeature.ORDER,['CREATE', 'UPDATE','DELETE']),
        ]),
      },
      //   {
      //     role: ERole.USER,
      //     permissions: flatMap([
      //       ...this.createManyPermissionFromFeature(ECrudFeature.BILL),
      //       ...this.createManyPermissionFromFeature(ECrudFeature.BILL_INFO),
      //       ...this.createManyPermissionFromFeature(ECrudFeature.BILL_SERVICE),
      //       ...this.createManyPermissionFromFeature(ECrudFeature.CUSTOMER),
      //       ...this.createManyPermissionFromFeature(ECrudFeature.PAYMENT),
      //       ...this.createManyPermissionFromFeature(ECrudFeature.DESTINATION)
      //     ])
      //   },
      {
        role: ERole.USER,
        permissions: flatMap([
          ...this.createManyPermissionFromFeature(ECrudFeature.USER, ['DELETE', 'READ']),
          ...this.createManyPermissionFromFeature(ECrudFeature.ORDER),
          ...this.createManyPermissionFromFeature(ECrudFeature.PRODUCT,['CREATE', 'UPDATE','DELETE']),
        ]),
      },
    ];
  }

  private createPermissions() {
    return Promise.all(
      enumToArray(ECrudFeature).map(feature => {
        return Promise.all(
          enumToArray(ECrudAction).map(action => {
            const permission = this.createPermission(feature, action);
            const dto = new Permission();
            dto.name = permission;
            return dto.save();
          }),
        );
      }),
    );
  }

  private createSuperPermission() {
    const dto = new Permission();
    dto.name = 'ALL';
    return dto.save();
  }

  public createPermission(feature: string, action: string): string {
    return `${feature}_${action}`;
  }

  public createManyPermissionFromFeature(
    feature: string,
    exclude?: TCrudAction[],
  ): string[] {
    let action = enumToArray(ECrudAction);
    if (exclude) {
      action = remove(action, (item) => {
        return exclude.includes(item) === false
      });
    }
    return action.map(action => {
      return this.createPermission(feature, action);
    });
  }

  public async assignPermissionsToRoles(roleEntities: Array<Role>) {
    await this.createPermissions();
    await this.createSuperPermission();
    const racls = this._racls;
    await Promise.all(
      racls.map(async racl => {
        const roleEntity = roleEntities.find(item => item.name === racl.role);
        
        const permissionAllow = await Permission.find({
          where: {
            name: racl.permissions.length ? In(racl.permissions) : '',
          },
        });
        roleEntity.permissions = permissionAllow;
        return roleEntity.save();
      }),
    );
  }
}
