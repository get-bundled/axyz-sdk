import { Wallet } from '../types';
import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateAutoConnectWallet = (context: Context) => {
  const autoConnectWallet = async (): Promise<Wallet | null> => {
    const wallet = context.get('wallet');
    const autoConnect = context.get('autoConnect');

    if (!autoConnect) {
      return null;
    }

    if (!wallet) {
      throw new Error(
        'No wallet found. This likely means no wallet name was found in local storage.'
      );
    }

    context.set('connecting', true);

    await wallet.connect();

    context.set('connecting', false);
    context.set('publicKey', wallet.publicKey);
    context.set('isConnected', true);

    return wallet;
  };

  return autoConnectWallet;
};
