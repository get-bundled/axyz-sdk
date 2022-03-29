import { WalletError, WalletNotReadyError } from '@solana/wallet-adapter-base';
import type { SolanaWallet } from '../../types';
import checkIfWalletAvailable from './checkIfWalletAvailable';

const handleUnavailableWallet = (wallet: SolanaWallet, handleError: (e: WalletError) => void) => {
  const isAvailable = checkIfWalletAvailable(wallet);

  if (isAvailable) {
    return true;
  }

  if (typeof window !== 'undefined') {
    window.open(wallet.url, '_blank');
  }

  handleError(new WalletNotReadyError());
  return false;
};

export default handleUnavailableWallet;
