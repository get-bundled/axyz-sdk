import { Wallet } from '../types/wallet';

const signMessage = (message: Uint8Array, wallet: Wallet) => {
  if (wallet && 'signMessage' in wallet) {
    return wallet.signMessage(message);
  }

  return undefined;
};

export default signMessage;
