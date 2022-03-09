import { Param, Post } from '@nestjs/common';
import { TronService } from '../services/tron.service';
import { BusinessController } from '../../common/decorator/business-controller.decorator';

@BusinessController('/tron', 'Wallets')
export class TronController {
  constructor(private readonly tronService: TronService) {}

  @Post('/withdraw/:walletAddress/:amount')
  async withdraw(
    @Param('walletAddress') walletAddress: string,
    @Param('amount') amount: number,
  ) {
    return await this.tronService.withdraw(walletAddress, amount);
  }
}
