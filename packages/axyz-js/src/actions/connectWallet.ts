import { Wallet } from '../types';
import Context from '../utils/context';
import { setStoredWalletName } from '../utils/localStorage';
import { findWallet } from '../utils/wallet';

// eslint-disable-next-line import/prefer-default-export
export const CreateConnectWallet = (context: Context) => {
  const connectWallet = async (name?: string): Promise<Wallet> => {
    let wallet = context.get('wallet');
    context.set('connecting', true);

    if (!wallet && !name) {
      throw new Error('No wallet found. Ensure you have selected a wallet.');
    }

    if (!wallet && name) {
      wallet = findWallet(context.get('wallets'), name);
      setStoredWalletName(wallet.name);
    }

    if (!wallet) {
      throw new Error('No wallet found.');
    }

    await wallet.connect();

    context.set('connecting', false);
    context.set('publicKey', wallet.publicKey);
    context.set('isConnected', true);

    return wallet;
  };

  return connectWallet;
};
