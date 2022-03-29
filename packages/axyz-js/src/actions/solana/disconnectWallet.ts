import { setStoredWalletName, clearStoredSignature } from '../../solana';
import type Context from '../../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateDisconnectWallet = (context: Context) => {
  const disconnectWallet = async (): Promise<void> => {
    const wallet = context.getSolana('wallet');
    context.setSolana('disconnecting', true);

    if (!wallet) {
      throw new Error('No wallet found. Nothing to disconnect.');
    }

    setStoredWalletName(null);
    clearStoredSignature(context);

    await wallet.disconnect();

    context.setSolana('disconnecting', false);
    context.setSolana('wallet', undefined);
    context.setSolana('publicKey', undefined);
    context.setSolana('isConnected', false);
  };

  return disconnectWallet;
};
