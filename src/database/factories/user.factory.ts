import { User } from '../../users/user.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Role } from '../../roles/role.entity';

define(User, (faker: typeof Faker, context: { role: Role, password: string }) => {
  const { role, password } = context;

  const name = faker.name.findName();
  const username = faker.internet.userName();
  const email = faker.internet.email(name);
  const avatar = faker.internet.avatar();
  const dayOfBirth = faker.date.between("1975/01/01", "2010/01/01");
  const address = faker.address.city();
  const phone = faker.phone.phoneNumber();

  const user = new User();
  user.name = name;
  user.username = username;
  user.password = password;
  user.email = email;
  user.avatar = avatar;
  user.dayOfBirth = dayOfBirth;
  user.address = address;
  user.phone = phone;
  user.role = role;

  return user;
});
