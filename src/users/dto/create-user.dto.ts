import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsMobilePhone,
} from 'class-validator';

export class CreateUserDto {
  name: string;

  @MinLength(6)
  @MaxLength(30)
  username: string;

  @MinLength(8)
  password: string;

  email: string;

  dayOfBirth: Date;

  address: string;

  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  role: string;
}
