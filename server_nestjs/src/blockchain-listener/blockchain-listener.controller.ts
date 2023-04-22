import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockchainListenerService } from './blockchain-listener.service';
import { CreateBlockchainListenerDto } from './dto/create-blockchain-listener.dto';
import { UpdateBlockchainListenerDto } from './dto/update-blockchain-listener.dto';

@Controller('blockchain-listener')
export class BlockchainListenerController {
  constructor(private readonly blockchainListenerService: BlockchainListenerService) {}

  @Post()
  create(@Body() createBlockchainListenerDto: CreateBlockchainListenerDto) {
    return this.blockchainListenerService.create(createBlockchainListenerDto);
  }

  @Get()
  findAll() {
    return this.blockchainListenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockchainListenerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockchainListenerDto: UpdateBlockchainListenerDto) {
    return this.blockchainListenerService.update(+id, updateBlockchainListenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockchainListenerService.remove(+id);
  }
}
