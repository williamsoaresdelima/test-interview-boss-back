import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat-gateway';

describe('ChatGateway', () => {
  let provider: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    provider = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
