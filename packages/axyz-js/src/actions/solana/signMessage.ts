import checkWalletConnection from '../../solana/checkWalletConnection';
import type Context from '../../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateSignMessage = (context: Context) => {
  const signMessage = (message: Uint8Array) => {
    const wallet = checkWalletConnection(context.getSolana('wallet'));

    wallet.signMessage(message);
  };

  return signMessage;
};
