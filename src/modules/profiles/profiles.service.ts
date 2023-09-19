import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name)

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {

  }
  async create(createProfileDto: CreateProfileDto) {
    this.logger.log(createProfileDto)
    const profile = this.profileRepository.create(createProfileDto)
    await this.profileRepository.save(profile)
    return profile;
  }

  async findAll() {
    const allUsers = await this.profileRepository.find()
    return allUsers;
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id } })
    return profile;
  }
}
