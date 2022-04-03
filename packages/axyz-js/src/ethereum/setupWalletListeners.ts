import { EthereumWallet, ErrorCallback } from '../types';
import type AxyzEthereumContext from './context';
import { createOrLoadMessageSignature } from './signature';

const setupWalletListeners = (
  wallet: EthereumWallet,
  context: AxyzEthereumContext,
  onError?: ErrorCallback
) => {
  wallet.on('change', async () => {
    // This event fires when first connecting to some wallets. We should just ignore it then.
    if (!context.get('isConnected')) {
      return;
    }

    const account = await wallet.getAccount();

    if (!account) {
      onError?.(new Error('Something went wrong connecting.'));
      return;
    }

    const { signature, message } = await createOrLoadMessageSignature(context, wallet);

    context.setMany({
      address: account,
      signature,
      signatureMessage: message,
    });
  });

  wallet.on('error', (error: Error) => {
    onError?.(error as Error);
  });
};

export default setupWalletListeners;
