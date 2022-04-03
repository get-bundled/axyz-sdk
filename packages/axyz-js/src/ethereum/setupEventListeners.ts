import type AxyzEthereumContext from './context';
import { clearStoredSignature, createOrLoadMessageSignature } from './signature';

const setupEventListeners = (context: AxyzEthereumContext) => {
  context.on(
    'connect',
    async (wallet, callback) => {
      const account = await wallet.getAccount();

      if (!account) {
        return;
      }

      const { signature, message } = await createOrLoadMessageSignature(context, wallet);

      context.setMany({
        isConnected: true,
        wallet,
        address: account,
        signatureAddress: account,
        signature,
        signatureMessage: message,
      });

      await callback?.();
    },
    context
  );

  context.on('disconnect', async (callback) => {
    clearStoredSignature(context);

    context.setMany({
      isConnected: false,
      wallet: null,
      address: null,
    });

    await callback?.();
  });
};

export default setupEventListeners;
