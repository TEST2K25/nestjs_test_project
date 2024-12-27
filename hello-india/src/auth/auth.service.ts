import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // generate user token here
  generateToken(userEmail: string, userId: string): string {
    console.log('User details are', userEmail, userId);
    const token = this.jwtService.sign({ userEmail, userId });
    return token;
  }

  // validate user token
  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Invalid login. Please login again',
      );
    }
  }
}
