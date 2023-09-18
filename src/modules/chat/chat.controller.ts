import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chat')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/messages')
  findAllMessages(@Query() query: any, @Request() req: any) {
    const otherProfile = query.otherProfile;
    return this.chatService.findAllMessages(req.user.profileId, otherProfile);
  }

  @Get('/messages/sent')
  findAllSentMessages(@Request() req: any) {
    return this.chatService.findAllSentMessages(req.user.profileId);
  }

  @Get('/messages/received')
  findAllReceivedMessages(@Request() req: any) {
    return this.chatService.findAllReceivedMessages(req.user.profileId);
  }
}
