import type { SendTransactionOptions } from '@solana/wallet-adapter-base';
import type { Transaction } from '@solana/web3.js';
import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateSendTransaction = (context: Context) => {
  const sendTransaction = (transaction: Transaction, options?: SendTransactionOptions) => {
    const wallet = checkWalletConnection(context.get('wallet'));

    return wallet.sendTransaction(transaction, context.get('connection'), options);
  };
  return sendTransaction;
};
