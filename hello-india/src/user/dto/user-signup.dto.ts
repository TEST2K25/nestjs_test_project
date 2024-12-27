import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  minLength,
  ValidateIf,
} from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long.' })
  password: string;

  @ValidateIf((o) => o.password)
  @IsString()
  confirmPassword: string;
}
