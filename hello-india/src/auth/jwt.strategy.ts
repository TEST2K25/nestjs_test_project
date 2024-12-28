import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Validate expiration
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use JWT_SECRET from env
    });
  }
  async validate(payload: any): Promise<{ userId: string; userEmail: string }> {
    // This can attach the user payload to the request object
    return { userId: payload.userId, userEmail: payload.userEmail };
  }
}
