import { Injectable } from '@nestjs/common';
import { CreateBlockchainListenerDto } from './dto/create-blockchain-listener.dto';
import { UpdateBlockchainListenerDto } from './dto/update-blockchain-listener.dto';

@Injectable()
export class BlockchainListenerService {
  create(createBlockchainListenerDto: CreateBlockchainListenerDto) {
    return 'This action adds a new blockchainListener';
  }

  findAll() {
    return `This action returns all blockchainListener`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockchainListener`;
  }

  update(id: number, updateBlockchainListenerDto: UpdateBlockchainListenerDto) {
    return `This action updates a #${id} blockchainListener`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockchainListener`;
  }
}
