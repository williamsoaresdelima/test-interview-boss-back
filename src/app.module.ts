import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { ChatGateway } from './chat-gateway/chat-gateway';

@Module({
  imports: [CandidatesModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
