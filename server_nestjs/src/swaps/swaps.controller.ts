import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwapsService } from './swaps.service';
import { CreateSwapDto } from './dto/create-swap.dto';
import { UpdateSwapDto } from './dto/update-swap.dto';

@Controller('swaps')
export class SwapsController {
  constructor(private readonly swapsService: SwapsService) {}

  @Post()
  create(@Body() createSwapDto: CreateSwapDto) {
    return this.swapsService.create(createSwapDto);
  }

  @Get()
  findAll() {
    return this.swapsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.swapsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwapDto: UpdateSwapDto) {
    return this.swapsService.update(+id, updateSwapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swapsService.remove(+id);
  }
}
