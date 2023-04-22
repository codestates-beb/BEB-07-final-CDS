import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockchainListenerDto } from './create-blockchain-listener.dto';

export class UpdateBlockchainListenerDto extends PartialType(CreateBlockchainListenerDto) {}
