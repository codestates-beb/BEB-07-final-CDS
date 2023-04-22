import { Test, TestingModule } from '@nestjs/testing';
import { SwapsController } from './swaps.controller';
import { SwapsService } from './swaps.service';

describe('SwapsController', () => {
  let controller: SwapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapsController],
      providers: [SwapsService],
    }).compile();

    controller = module.get<SwapsController>(SwapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
