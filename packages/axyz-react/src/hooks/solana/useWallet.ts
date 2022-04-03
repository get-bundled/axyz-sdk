import { SolanaWallet } from '@axyzsdk/js';
import type { WalletContextState as SolanaWalletContextState } from '@solana/wallet-adapter-react';
import { createContext, useContext } from 'react';

export interface WalletContextState {
  wallet?: SolanaWallet | null;
  connected: boolean;
  connecting: SolanaWalletContextState['connecting'];
  loading: boolean;
  disconnecting: SolanaWalletContextState['disconnecting'];
  connect: SolanaWalletContextState['connect'];
  disconnect: SolanaWalletContextState['disconnect'];
  select: SolanaWalletContextState['select'];
}

export const WalletContext = createContext<WalletContextState>({} as WalletContextState);

export const useWallet = (): WalletContextState => useContext(WalletContext);
