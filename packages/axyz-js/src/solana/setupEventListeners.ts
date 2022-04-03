import type AxyzSolanaContext from './context';
import { clearStoredSignature, createOrLoadMessageSignature } from './signature';

const setupEventListeners = (context: AxyzSolanaContext) => {
  context.on('connect', async (wallet, callback) => {
    const { signature, message } = await createOrLoadMessageSignature(context, wallet);

    context.setMany({
      isConnected: true,
      wallet,
      publicKey: wallet.publicKey,
      signaturePublicKey: wallet.publicKey,
      signature,
      signatureMessage: message,
    });

    await callback?.();
  });

  context.on('disconnect', async (callback) => {
    clearStoredSignature(context);

    context.setMany({
      isConnected: false,
      wallet: null,
      publicKey: null,
      signature: undefined,
      signaturePublicKey: undefined,
      signatureMessage: undefined,
    });

    await callback?.();
  });
};

export default setupEventListeners;
