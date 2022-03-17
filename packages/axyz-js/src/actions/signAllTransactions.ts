import type { Transaction } from '@solana/web3.js';
import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateSignAllTransactions = (context: Context) => {
  const signAllTransactions = (transactions: Transaction[]) => {
    const wallet = checkWalletConnection(context.get('wallet'));

    return wallet.signAllTransactions(transactions);
  };

  return signAllTransactions;
};
