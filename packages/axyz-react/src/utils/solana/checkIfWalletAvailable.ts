import { WalletReadyState } from '@solana/wallet-adapter-base';
import type { SolanaWallet } from '../../types';

const checkIfWalletAvailable = (wallet: SolanaWallet) => {
  const ready = wallet.readyState === WalletReadyState.Installed;
  const loadable = wallet.readyState === WalletReadyState.Loadable;

  return ready || loadable;
};

export default checkIfWalletAvailable;
