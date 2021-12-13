import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Wallet } from '../types/wallet';

const checkIfWalletAvailable = (wallet: Wallet) => {
  const ready = wallet.readyState === WalletReadyState.Installed;
  const loadable = wallet.readyState === WalletReadyState.Loadable;

  return ready || loadable;
};

export default checkIfWalletAvailable;
