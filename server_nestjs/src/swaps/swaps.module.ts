import { Module } from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { SwapsController } from './swaps.controller';

@Module({
  controllers: [SwapsController],
  providers: [SwapsService]
})
export class SwapsModule {}
