import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUsers(req: any): Promise<User[]> {
    const { username, id } = await req;
    if (username) {
      return this.userRepository.find({
        where: { username },
        relations: ['role', 'order'],
      });
    }
    if (id) {
      return this.userRepository.find({
        where: { id },
        relations: ['role', 'order'],
      });
    }
    const users = await this.userRepository.find({ relations: ['role', 'order'] });
    await users.sort((a, b) => a.id - b.id);
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = this.userRepository.findOne(id, {
      relations: ['role', 'role.permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found!!`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.userRepository.find();
    const foundEmail = users.find(user => user.email === createUserDto.email);
    const foundUsername = users.find(
      user => user.username === createUserDto.username,
    );
    if (foundEmail && createUserDto.email) {
      throw new NotFoundException(`User with email is existed!!`);
    }
    if (foundUsername) {
      throw new NotFoundException('Username is existed');
    }
    createUserDto = {
      ...createUserDto,
      role: 'USER',
    };
    return this.userRepository.createUser(createUserDto);
  }

  async updateUserMobile(id: number, user: UpdateUserDto): Promise<User> {
    const userGetByID = await this.getUserById(id);

    // update password user at mobile
    if (user.newPassword) {
      const match = await bcrypt.compareSync(
        user.checkPassword,
        userGetByID.password,
      );
      if (match) {
        const pass = bcrypt.hashSync(user.newPassword, 10);
        this.userRepository.update(id, {
          password: pass,
        });
        return this.getUserById(id);
      } else {
        throw new NotFoundException('Kiểm tra lại pass cũ');
      }
    }

    // update profile user at mobile
    else {
      const userUpdate = {
        ...user,
        role: userGetByID.role,
      };
      this.userRepository.update(id, userUpdate);
      return this.getUserById(id);
    }
  }

  async updateUser(id: number, user: CreateUserDto): Promise<User> {
    const userGetByID = await this.getUserById(id);
    user.password = user.password
      ? bcrypt.hashSync(user.password, 10)
      : userGetByID.password;
    const checkRole = await this.checkRole(user.role);
    const userUpdate = checkRole
      ? {
          ...user,
          role: checkRole,
        }
      : {
          ...user,
          role: userGetByID.role,
        };
    this.userRepository.update(id, userUpdate);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found!!`);
    }
  }

  async login(data): Promise<any> {
    const { username, password } = await data;

    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    if (!user) {
      throw new HttpException('User not existed', HttpStatus.CONFLICT);
    } else {
      const match = await bcrypt.compareSync(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            userID: `${user.id}`,
          },
          'cnpm17tclc1',
        );
        return {
          token: token,
          role: user.role.name,
        };
      } else {
        throw new HttpException('Login fail', HttpStatus.CONFLICT);
      }
    }
  }

  async checkRole(role?: string): Promise<Role | null> {
    if (role) {
      return Role.findOne({ where: { name: role }})
    } else return null;
  }
}
