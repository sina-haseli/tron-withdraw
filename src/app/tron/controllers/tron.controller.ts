import { Body, Get, Param, Post } from '@nestjs/common';
import { TronService } from '../services/tron.service';
import { CreateTronDto } from '../dto/create-tron.dto';
import { BusinessController } from '../../common/decorator/business-controller.decorator';

@BusinessController('/tron', 'Wallets')
export class TronController {
  constructor(private readonly tronService: TronService) {}

  @Post('/')
  async createTron(@Body() tron: CreateTronDto) {
    return await this.tronService.createTron(tron);
  }

  @Get('/user/:userId')
  async getTron(@Param('userId') userId: number) {
    return await this.tronService.getTron(userId);
  }

  @Get('/wallet/:walletAddress')
  async getTronByWalletAddress(@Param('walletAddress') walletAddress: string) {
    return await this.tronService.getTronByWalletAddress(walletAddress);
  }

  @Post('/blockNumber/:blockNumber')
  async getTronByBlockNumber(@Param('blockNumber') blockNumber: number) {
    await this.tronService.setBlockNumberRedis(blockNumber);
    return {
      message: 'success',
    };
  }

  @Get('/lastBlockNumber')
  async getLastBlockNumber() {
    const result = await this.tronService.getLastBlockNumber();
    return {
      lastBlockNumberRedis: result,
    };
  }

  @Get('/lastBlockNumberTron')
  async getLastBlockNumberTron() {
    const result = await this.tronService.getCurrentBlock();
    return {
      lastBlockNumberTron: result,
    };
  }

  @Post('/withdraw/:walletAddress/:amount')
  async withdraw(
    @Param('walletAddress') walletAddress: string,
    @Param('amount') amount: number,
  ) {
    return await this.tronService.withdraw(walletAddress, amount);
  }
}
