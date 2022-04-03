import { SolanaWallet, ErrorCallback } from '../types';

const setupWalletListeners = (wallet: SolanaWallet, onError?: ErrorCallback) => {
  wallet.on('error', (error: Error) => {
    onError?.(error as Error);
  });
};

export default setupWalletListeners;
