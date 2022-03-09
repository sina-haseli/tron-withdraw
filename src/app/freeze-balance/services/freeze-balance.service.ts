import { Injectable } from '@nestjs/common';
import { FreezeBalanceRepository } from '../repositories/freeze-balance.repository';
import { BusinessService } from '../../base/business.service';
import { FreezeBalance } from '../entities/freeze-balance.entity';
import { Cron, CronExpression } from "@nestjs/schedule";

const TronWeb = require('tronweb');

const { FULL_NODE, SOLIDITY_NODE, EVENT_SERVER_NODE } =
  process.env;

const fullNode = FULL_NODE;
const solidityNode = SOLIDITY_NODE;
const event = EVENT_SERVER_NODE;

const tronWeb = new TronWeb(fullNode, solidityNode, event);

@Injectable()
export class FreezeBalanceService extends BusinessService<FreezeBalance> {
  constructor(
    private readonly freezeBalanceRepository: FreezeBalanceRepository,
  ) {
    super(freezeBalanceRepository);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async unfreezesBalance() {
    const freezeBalance = await this.getFreezeBalancelast3Days();
    if (freezeBalance.length > 0) {
      for (const item of freezeBalance) {
        const unfreeze = await tronWeb.transactionBuilder.unfreezeBalance(
          item.resource,
          item.owner_address,
          item.receiver_address,
        );
        if (unfreeze) {
          await this.freezeBalanceRepository.update(
            { id: item.id },
            { unFreeze: true },
          );
        }
      }
    }
  }
  async getFreezeBalancelast3Days(): Promise<any> {
    return await this.freezeBalanceRepository.getFreezeBalancelast3Days();
  }
}
