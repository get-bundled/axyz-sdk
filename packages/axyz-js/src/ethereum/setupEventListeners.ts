import type AxyzEthereumContext from './context';
import {
  clearStoredEthereumSignature,
  createOrLoadEthereumNonceMessageSignature,
} from './signature';

const setupEventListeners = (context: AxyzEthereumContext) => {
  context.on(
    'connect',
    async (wallet, callback) => {
      const account = await wallet.getAccount();

      if (!account) {
        return;
      }

      const { signature, message } = await createOrLoadEthereumNonceMessageSignature(
        context,
        wallet
      );

      context.setMany({
        isConnected: true,
        wallet,
        address: account,
        signatureAddress: account,
        signature,
        nonceMessage: message,
      });

      await callback?.();
    },
    context
  );

  context.on('disconnect', async (callback) => {
    clearStoredEthereumSignature(context);

    context.setMany({
      isConnected: false,
      wallet: null,
      address: null,
    });

    await callback?.();
  });
};

export default setupEventListeners;
