import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { databaseFactory } from './shared/config/databse';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/chat-gateway/chat-gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
      inject: [ConfigService],
      useFactory: databaseFactory,
    }),
    AuthModule,
    ProfilesModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
