import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainListenerController } from './blockchain-listener.controller';
import { BlockchainListenerService } from './blockchain-listener.service';

describe('BlockchainListenerController', () => {
  let controller: BlockchainListenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainListenerController],
      providers: [BlockchainListenerService],
    }).compile();

    controller = module.get<BlockchainListenerController>(BlockchainListenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
