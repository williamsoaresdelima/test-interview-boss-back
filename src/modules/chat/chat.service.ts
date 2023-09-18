import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthService } from '../auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    // private authService: AuthService
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    this.logger.log({ method: 'create', dto: createMessageDto });

    const newMessage = this.messageRepository.create(createMessageDto);

    await this.messageRepository.save(newMessage);

    this.logger.log({ method: 'create', data: newMessage, message: 'message created' });

    return newMessage;
  }

  findAllSentMessages(profile_id: number) {
    this.logger.log({ profile_id, message: 'profile_id of sender' });

    return this.messageRepository.find({
      where: {
        sender_id: profile_id
      },
      relations: ['sender']
    });
  }

  findAllReceivedMessages(profile_id: number) {
    this.logger.log({ profile_id, message: 'profile_id of received' });

    return this.messageRepository.find({
      where: {
        recipient_id: profile_id
      }
    });
  }
}
