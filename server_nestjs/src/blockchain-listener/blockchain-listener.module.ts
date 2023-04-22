import { Module } from '@nestjs/common';
import { BlockchainListenerService } from './blockchain-listener.service';
import { BlockchainListenerController } from './blockchain-listener.controller';

@Module({
  controllers: [BlockchainListenerController],
  providers: [BlockchainListenerService]
})
export class BlockchainListenerModule {}
