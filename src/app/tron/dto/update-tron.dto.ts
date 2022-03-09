import { PartialType } from '@nestjs/mapped-types';
import { CreateTronDto } from './create-tron.dto';

export class UpdateTronDto extends PartialType(CreateTronDto) {}
