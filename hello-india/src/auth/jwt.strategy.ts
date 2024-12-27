import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'djkaqYUiiHJbbjghtiugjbiuvvgfufhnvnb',
    });
  }
  async validate(payload: any): Promise<{ userId: string; userEmail: string }> {
    // This can attach the user payload to the request object
    return { userId: payload.userId, userEmail: payload.userEmail };
  }
}
