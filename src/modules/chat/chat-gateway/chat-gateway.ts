import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8080, { cors: '*' })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    async handleEvent(@MessageBody() data: string) {
        console.log(data)
        this.server.emit('message', data)

        return data
    }
}
