import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  @Auth('USER_READ')
  getUsers(@Query() req): Promise<User[]> {
    return this.usersService.getUsers(req);
  }

  @Get('users/:id')
  @Auth('USER_READ')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post('auth/register')
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('users/create')
  @Auth('USER_CREATE')
  createUsersByAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/auth/login')
  login(@Body() data): Promise<any> {
    return this.usersService.login(data);
  }

  @Get('me')
  @Auth('')
  getProfile(@Req() request) {
    return request.user
  }

  @Put('update/:id')
  @Auth('')
  updateUserMobile(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserMobile(id, user);
  }

  @Put('users/:id')
  @Auth('USER_UPDATE')
  updateUser(
    @Param('id') id: number,
    @Body() user: CreateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete('users/:id')
  @Auth('USER_DELETE')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
