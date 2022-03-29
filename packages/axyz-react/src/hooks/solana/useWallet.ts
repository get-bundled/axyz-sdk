import { Adapter } from '@solana/wallet-adapter-base';
import { createContext, useContext } from 'react';
import { SolanaWallet } from '../../types';

export interface WalletContextState {
  wallet?: SolanaWallet;
  installedWallets: SolanaWallet[];
  loadableWallets: SolanaWallet[];
  undetectedWallets: SolanaWallet[];
  connecting: boolean;
  disconnecting: boolean;
  select: (wallet: SolanaWallet) => void;
  connect(wallet: Adapter): Promise<void | null>;
  disconnect(): Promise<void>;
  connected: boolean;
}

export const WalletContext = createContext<WalletContextState>({} as WalletContextState);

export const useWallet = (): WalletContextState => useContext(WalletContext);
