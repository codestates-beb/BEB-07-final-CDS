import { PartialType } from '@nestjs/mapped-types';
import { CreateSwapDto } from './create-swap.dto';

export class UpdateSwapDto extends PartialType(CreateSwapDto) {}
