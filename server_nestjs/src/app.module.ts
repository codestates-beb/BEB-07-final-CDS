import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SwapsModule } from './swaps/swaps.module';
import { EmailModule } from './email/email.module';
import { BlockchainListenerModule } from './blockchain-listener/blockchain-listener.module';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    SwapsModule,
    EmailModule,
    BlockchainListenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
