import { IsDefined, IsEmail, IsString } from 'class-validator';
import { User } from '../interface/user';

export class UserDto {
  @IsString()
  @IsEmail()
  @IsDefined()
  email: User['email'];

  @IsString()
  @IsDefined()
  username: User['username'];
}

export class UserParamsDto {
  @IsString()
  @IsEmail()
  @IsDefined()
  email: User['email'];
}
