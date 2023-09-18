import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { GetProfilesDto } from './dto/get-profiles.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() parameters: GetProfilesDto) {
    return this.profilesService.findAll(parameters.type);
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }
}
