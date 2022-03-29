import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import type { SolanaWallet } from '../types';
import { WalletNotSelectedError } from './errors';

const checkWalletConnection = (wallet?: SolanaWallet) => {
  if (!wallet) {
    throw new WalletNotSelectedError(
      'No wallet selected. Please ensure you have selected and connected a wallet.'
    );
  }

  if (!wallet.connected) {
    throw new WalletNotConnectedError(
      'Wallet not connected. Please ensure you have connected first.'
    );
  }

  return wallet;
};

export default checkWalletConnection;
