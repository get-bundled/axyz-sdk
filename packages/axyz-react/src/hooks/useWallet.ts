import { Adapter } from '@solana/wallet-adapter-base';
import { createContext, useContext } from 'react';
import { Wallet } from '../types/wallet';

export interface WalletContextState {
  wallet?: Adapter;
  installedWallets: Wallet[];
  loadableWallets: Wallet[];
  undetectedWallets: Wallet[];
  connecting: boolean;
  disconnecting: boolean;
  select: (wallet: Wallet) => void;
  connect(wallet: Adapter): Promise<void | null>;
  disconnect(): Promise<void>;
  connected: boolean;
}

export const WalletContext = createContext<WalletContextState>({} as WalletContextState);

const useWallet = (): WalletContextState => useContext(WalletContext);

export default useWallet;
