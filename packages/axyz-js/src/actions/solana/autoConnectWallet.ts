import { SolanaWallet } from '../../types';
import Context from '../../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateAutoConnectWallet = (context: Context) => {
  const autoConnectWallet = async (): Promise<SolanaWallet | null> => {
    const wallet = context.getSolana('wallet');
    const autoConnect = context.getSolana('autoConnect');

    if (!autoConnect) {
      return null;
    }

    if (!wallet) {
      throw new Error(
        'No wallet found. This likely means no wallet name was found in local storage.'
      );
    }

    context.setSolana('connecting', true);

    await wallet.connect();

    context.setSolana('connecting', false);
    context.setSolana('publicKey', wallet.publicKey);
    context.setSolana('isConnected', true);

    return wallet;
  };

  return autoConnectWallet;
};
