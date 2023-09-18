import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ProfileTypeEnum } from '../../../shared/enums/profile-type';

export interface IPayloadValidate {
  email: string;
  id: number;
  type: ProfileTypeEnum;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: IPayloadValidate) {
    return { 
      email: payload.email,
      profileId: payload.id,
      type: payload.type
    };
  }
}
