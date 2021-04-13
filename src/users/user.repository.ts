import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      name,
      username,
      password,
      email,
      dayOfBirth,
      address,
      phone,
      role,
    } = createUserDto;

    const user = new User();
    user.name = name;
    user.username = username;
    user.password = password;
    user.email = email;
    user.avatar = '';
    user.dayOfBirth = dayOfBirth;
    user.address = address;
    user.phone = phone;
    user.role = await Role.findOne({ where: { name: role } });
    await user.save();

    return user;
  }
}
