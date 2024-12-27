import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ResetEmailDto {
  @IsEmail()
  userEmail: string;

  @IsOptional()
  otp: string;

  @IsOptional()
  password: string;

  @IsOptional()
  confirmPassword: string;
}

export class ValidateOtpDto {
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  otp: string;

  @IsOptional()
  password: string;

  @IsOptional()
  confirmPassword: string;
}

export class ChnagePasswordDto {
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
