import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';

import { UsersService } from '../../users/users.service';
import { JWTPayload } from '../interfaces/jwtPayload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JWTPayload): Promise<User> {
    const user = await this.usersService.getUserById(payload.id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
