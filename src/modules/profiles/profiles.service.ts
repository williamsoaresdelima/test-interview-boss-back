import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileTypeEnum } from 'src/shared/enums/profile-type';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    this.logger.log({ method: 'create', dto: createProfileDto });

    const profile = this.profileRepository.create(createProfileDto);

    await this.profileRepository.save(profile);

    this.logger.log({
      method: 'create',
      data: profile,
      message: 'profile created',
    });

    delete profile.password;

    return profile;
  }

  async findAll(type?: string) {
    const where = {
      type: '',
    };

    if (type === ProfileTypeEnum.RECRUITER) {
      where.type = ProfileTypeEnum.RECRUITER;
    } else if (type === ProfileTypeEnum.CANDIDATE) {
      where.type = ProfileTypeEnum.CANDIDATE;
    } else {
      delete where.type;
    }

    return this.profileRepository.find({
      where,
      select: {
        id: true,
        name: true,
        type: true,
        email: true,
        description: true,
        phone_number: true,
      },
    });
  }

  async findOne(id: number) {
    this.logger.log({ method: 'findOne', id_received: id });

    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });

    if (!profile) {
      this.logger.error({
        method: 'findOne',
        id_received: id,
        message: 'profile not found',
      });

      throw new NotFoundException('Profile Not Found');
    }

    return profile;
  }

  async findByEmail(email: string): Promise<any> {
    this.logger.log({ method: 'findByEmail', email_received: email });

    const profile = await this.profileRepository.findOne({
      where: {
        email,
      },
    });

    this.logger.log({
      method: 'findByEmail',
      profile_is_found: !!profile ? 'FOUND' : 'NOT FOUND',
    });

    return profile;
  }
}
