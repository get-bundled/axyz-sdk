import solanaWeb3, { PublicKey } from '@solana/web3.js';
import { AxiosInstance } from 'axios';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getWalletAdapters } from '@solana/wallet-adapter-wallets';
import { findWallet } from './wallet';
import { Entitlements, EntitlementMapping, Wallet } from '../types';
import { getStoredWalletName } from './localStorage';

export interface BundledContextArguments {
  apiKey: string;
  api: AxiosInstance;
  environment: 'local' | 'development' | 'production';
  solanaNetwork: solanaWeb3.Cluster;
  connection: solanaWeb3.Connection;
  autoConnect?: boolean;
}

export interface BundledContext extends BundledContextArguments {
  isConnected: boolean;
  publicKey?: PublicKey | null;
  wallets: Wallet[];
  wallet?: Wallet;
  connecting?: boolean;
  disconnecting?: boolean;
  entitlements?: Entitlements;
  entitlementList?: EntitlementMapping;
}

class Context {
  context: BundledContext;

  constructor(defaults: BundledContextArguments) {
    const wallets = getWalletAdapters({ network: defaults.solanaNetwork as WalletAdapterNetwork });

    // If there is a stored wallet name, preload it into the context so it can be auto-connected
    const storedWalletName = getStoredWalletName();

    const wallet = storedWalletName ? findWallet(wallets, storedWalletName) : undefined;

    this.context = {
      ...defaults,
      isConnected: false,
      wallets,
      wallet,
    };
  }

  get<N extends keyof BundledContext, I extends BundledContext[N]>(name: N): I {
    return this.context[name] as I;
  }

  getAll() {
    return this.context;
  }

  set<N extends keyof BundledContext>(name: N, item: BundledContext[N]) {
    this.context[name] = item as BundledContext[N];
  }
}

export default Context;
