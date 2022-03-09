import { Get, Param } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { BusinessController } from '../../common/decorator/business-controller.decorator';

@BusinessController('/transaction', 'Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':transactionid')
  findOne(@Param('transactionid') transactionid: string) {
    return this.transactionService.findByTransactionId(transactionid);
  }
}
