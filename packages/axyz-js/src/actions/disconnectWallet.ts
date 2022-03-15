import Context from '../utils/context';
import { setStoredWalletName } from '../utils/localStorage';
import { clearStoredSignature } from '../utils/signature';

// eslint-disable-next-line import/prefer-default-export
export const CreateDisconnectWallet = (context: Context) => {
  const disconnectWallet = async (): Promise<void> => {
    const wallet = context.get('wallet');
    context.set('disconnecting', true);

    if (!wallet) {
      throw new Error('No wallet found. Nothing to disconnect.');
    }

    setStoredWalletName(null);
    clearStoredSignature(context);

    await wallet.disconnect();

    context.set('disconnecting', false);
    context.set('wallet', undefined);
    context.set('publicKey', undefined);
    context.set('isConnected', false);
  };

  return disconnectWallet;
};
