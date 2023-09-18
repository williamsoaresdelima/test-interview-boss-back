import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { IMessage } from 'src/shared/interfaces/message';
import { Logger } from '@nestjs/common';
import { ProfilesService } from 'src/modules/profiles/profiles.service';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly profileService: ProfilesService,
  ) {}

  async handleConnection(socket: Socket) {}

  @SubscribeMessage('message')
  async listenForMessages(
    @MessageBody() message: IMessage,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log({ message: 'message received', data: message });
    const { content, recipient_id, sender_id } = message;
    const profile = await this.profileService.findOne(sender_id);
    const isRecruiter = profile.type === 'RECRUITER';
    const newMessage = await this.chatService.create({
      content,
      recipient_id,
      sender_id,
    });

    const room = `room_${isRecruiter ? sender_id : recipient_id}#${
      isRecruiter ? recipient_id : sender_id
    }`;

    this.server.sockets.to(room).emit('message', newMessage.content);

    return message;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: {
      roomName: string;
      socketId: string;
    },
  ) {
    console.log('PAYLOAD_JOIN_ROOM: ', payload);
    if (payload.socketId) {
      this.logger.log(`${payload.socketId} is joining ${payload.roomName}`);
      this.server.in(payload.socketId).socketsJoin(payload.roomName);
    }
  }

  // @SubscribeMessage('request_all_messages')
  // async requestAllMessages(
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const messages = await this.chatService.findAllMessagesByUser();

  //   socket.emit('send_all_messages', messages);
  // }
}
