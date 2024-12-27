import { IsEmail, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  userEmail: string;

  @MinLength(8, { message: 'Password must be more then 8 charactesr' })
  password: string;
}
