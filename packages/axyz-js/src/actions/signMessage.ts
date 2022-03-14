import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';
import doSignMessage from '../utils/signMessage';

// eslint-disable-next-line import/prefer-default-export
export const CreateSignMessage = (context: Context) => {
  const signMessage = (message: Uint8Array) => {
    const wallet = checkWalletConnection(context.get('wallet'));

    doSignMessage(message, wallet);
  };

  return signMessage;
};
