import type { Transaction } from '@solana/web3.js';
import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateSignTransaction = (context: Context) => {
  const signTransaction = (transaction: Transaction) => {
    const wallet = checkWalletConnection(context.get('wallet'));

    return wallet.signTransaction(transaction);
  };

  return signTransaction;
};
