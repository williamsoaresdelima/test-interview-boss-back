import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { ProfilesService } from '../profiles/profiles.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { IPayloadValidate } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly profilesService: ProfilesService,
    private readonly configService: ConfigService
  ) {}

  async login({ email, password }: CreateSessionDto) {
    this.logger.log({ method: 'login', email_received: email });

    const profile = await this.profilesService.findByEmail(email);

    if (!profile) {
      this.logger.error({ method: 'login', message: 'invalid E-mail'});

      throw new UnauthorizedException('E-mail or password does not match');
    }

    const passwordIsValid = await bcrypt.compare(password, profile.password);

    if (!passwordIsValid) {
      this.logger.error({ method: 'login', message: 'invalid password'});

      throw new UnauthorizedException('E-mail or password does not match');
    }

    delete profile.password;

    this.logger.log({ method: 'login', profile });

    const accessToken = this.jwtService.sign({
      id: profile.id,
      email: profile.email,
      type: profile?.type
    });

    
    return {
      access_token: accessToken,
      profile
    };
  }

  async authUser(req: any) {
    const profileId = req.user.profileId;

    this.logger.log({ method: 'authUser', profile_id_received: profileId });

    const profile = await this.profilesService.findOne(profileId);
    delete profile.password;
    return profile;
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: IPayloadValidate = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
    if (payload.id) {
      return this.profilesService.findOne(payload.id);
    }
  }
}
