import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseFactory } from './shared/config/database';
import { ChatGateway } from './modules/chat/chat-gateway/chat-gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: '.env'
      })],
      inject: [ConfigService],
      useFactory: databaseFactory
    }),
    ProfilesModule,
    AuthModule,
    ChatModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService,ChatGateway],
})
export class AppModule {}
