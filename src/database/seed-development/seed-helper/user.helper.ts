import { ERole } from '../../../common/enums/role.enum';
import { Role } from '../../../roles/role.entity';
import { User } from '../../../users/user.entity';

export class UserHelper {
  private _data: User[];

  constructor(role: Role[]) {
    this._data = this.getData(role);
  }

  private getData(role: Role[]): any[] {
    return [
      User.create({
        name: 'ADMIN',
        username: 'galtv1',
        password: '12345678',
        email: 'admin@gmail.com',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLT59hVd9IJPAOOjuNqM93omD7o-N8jM0VzA&usqp=CAU',
        dayOfBirth: '2011-10-05T14:48:00.000Z',
        address: 'Đà Nẵng',
        phone: '0796706754',
        role: role.find(item => item.name === ERole.ADMIN),
      }),
      User.create({
        name: 'MOD',
        username: 'galtv2',
        password: '12345678',
        email: 'mod@gmail.com',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLT59hVd9IJPAOOjuNqM93omD7o-N8jM0VzA&usqp=CAU',
        dayOfBirth: '2011-10-05T14:48:00.000Z',
        address: 'Quảng Bình',
        phone: '0796706755',
        role: role.find(item => item.name === ERole.MOD),
      }),
      User.create({
        name: 'MOD',
        username: 'galtv3',
        password: '12345678',
        email: 'shipper@gmail.com',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLT59hVd9IJPAOOjuNqM93omD7o-N8jM0VzA&usqp=CAU',
        dayOfBirth: '2011-10-05T14:48:00.000Z',
        address: 'Quảng Nam',
        phone: '0796706756',
        role: role.find(item => item.name === ERole.USER),
      }),
    ];
  }

  public initUser(): Promise<User[]> {
    return Promise.all(this._data.map(user => user.save()));
  }
}
