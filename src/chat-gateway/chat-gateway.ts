import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<string>> {
        return from(['Hello','How are you']).pipe(
            map((x) => ({event: 'events', data: x}))
        )
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: string): Promise<string> {
        return data
    }
}
