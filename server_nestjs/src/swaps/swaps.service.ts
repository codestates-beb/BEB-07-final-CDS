import { Injectable } from '@nestjs/common';
import { CreateSwapDto } from './dto/create-swap.dto';
import { UpdateSwapDto } from './dto/update-swap.dto';

@Injectable()
export class SwapsService {
  create(createSwapDto: CreateSwapDto) {
    return 'This action adds a new swap';
  }

  findAll() {
    return `This action returns all swaps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} swap`;
  }

  update(id: number, updateSwapDto: UpdateSwapDto) {
    return `This action updates a #${id} swap`;
  }

  remove(id: number) {
    return `This action removes a #${id} swap`;
  }
}
