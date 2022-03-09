import { Injectable } from '@nestjs/common';
import { BusinessService } from '../../base/business.service';
import { Tron } from '../entities/tron.entity';
import { TronRepository } from '../repositories/tron.repository';
import { TransactionService } from '../../transaction/services/transaction.service';
import { FreezeBalanceService } from '../../freeze-balance/services/freeze-balance.service';

const TronWeb = require('tronweb');

const { FULL_NODE, SOLIDITY_NODE, EVENT_SERVER_NODE, MAIN_PRIV_KEY } =
  process.env;

const fullNode = FULL_NODE;
const solidityNode = SOLIDITY_NODE;
const event = EVENT_SERVER_NODE;

const tronWeb = new TronWeb(fullNode, solidityNode, event);

@Injectable()
export class TronService extends BusinessService<Tron> {
  constructor(
    private readonly tronRepository: TronRepository,
    private readonly transactionService: TransactionService,
    private freezeBalanceService: FreezeBalanceService,
  ) {
    super(tronRepository);
  }

  async toHex(str: string) {
    try {
      const wallet = await tronWeb.toHex(str);
      console.log(wallet);
    } catch (error) {
      console.log(error);
    }
  }

  async toSun(number: number) {
    try {
      return await tronWeb.toSun(number);
    } catch (e) {
      console.log(e);
    }
  }

  async transaction(walletaddress: string, amount: number, privateKey: string) {
    try {
      const trx = await this.toSun(amount);
      const transaction = await tronWeb.trx.sendTransaction(
        walletaddress,
        trx,
        privateKey,
      );
      if (transaction) {
        return transaction;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async getLastTransactionEnergy() {
  //   try {
  //     const lastBlockNumber = await this.getCurrentBlock();
  //     const transaction = await tronWeb.trx.getTransactionInfo(
  //       '560cc15845862fcd842f6dfc7ce7379cabce8c5d558ef8906b03e2475ee50bd5',
  //     );
  //     if (transaction) {
  //       return transaction.receipt.net_fee;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async freezeBalance(
    amount: number,
    duration: number,
    resource: string,
    ownerAddress: string,
    receiverAddress: string,
  ) {
    try {
      const freeze = await tronWeb.transactionBuilder.freezeBalance(
        amount,
        duration,
        resource,
        ownerAddress,
        receiverAddress,
      );
      if (freeze) {
        console.log(freeze.raw_data.contract[0].parameter.value);
        await this.freezeBalanceService.save({
          frozen_duration: Number(duration),
          frozen_balance: Number(amount),
          resource: resource,
          owner_address: ownerAddress,
          receiver_address: receiverAddress,
          txID: freeze.txID,
        });
        return freeze.txID;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async chooseWallet(amount: number) {
    const wallet = await this.tronRepository.getWallet(amount);
    if (wallet.length > 0) {
      return wallet;
    }
  }

  async withdraw(walletAddress: string, amount: number) {
    // const wallets = await this.chooseWallet(amount);
    // const bestWallet = wallets[0];
    //TODO: should request to helia's service to get private key
    const sun = await this.toSun(1);
    const freeze = await this.freezeBalance(
      sun,
      3,
      'ENERGY',
      'TAKE1FM5EGPYqbuYMvZYFsYkX1tjfFUXom',
      walletAddress,
    );
    console.log(freeze);
    if (freeze) {
      const transaction = await this.transaction(
        walletAddress,
        amount,
        MAIN_PRIV_KEY,
      );
      console.log(transaction);
      if (transaction.result === true) {
        await this.transactionService.save({
          transactionId: transaction.transaction.txID,
          amount: amount,
          from_address: 'TAKE1FM5EGPYqbuYMvZYFsYkX1tjfFUXom',
          to_address: walletAddress,
        });
        return transaction.transaction.txID;
      }
    }
  }
}
