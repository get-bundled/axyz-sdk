import { EthereumWallet } from '@axyzsdk/js';
import { createContext, useContext } from 'react';

export interface WalletContextState {
  wallet?: EthereumWallet | null;
  connected: boolean;
  disconnect: () => Promise<void>;
  loading: boolean;
  error?: Error;
  ens?: {
    avatar?: string | null;
    name: string;
  };
  address?: string;
}

export const WalletContext = createContext<WalletContextState>({} as WalletContextState);

export const useWallet = (): WalletContextState => useContext(WalletContext);
