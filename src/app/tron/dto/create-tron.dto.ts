import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Unique } from '../../common/decorator/validator/unique';
import { Tron } from '../entities/tron.entity';

export class CreateTronDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(Unique, [Tron, 'walletId'])
  walletAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Validate(Unique, [Tron, 'userId'])
  userId: number;
}
