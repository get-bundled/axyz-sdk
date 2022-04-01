import solanaWeb3, { PublicKey } from '@solana/web3.js';
import { AxiosInstance } from 'axios';

import {
  findWallet as findSolanaWallet,
  getWallets as getSolanaWallets,
  getStoredWalletName as getSolanaStoredWalletName,
} from '../solana';

import type { EntitlementKeys, SolanaWallet, ErrorCallback } from '../types';
import type { ChainName } from '../types/ethereum';
import AxyzEthereumContext from '../ethereum/context';

export interface AxyzContextArguments {
  apiKey: string;
  api: AxiosInstance;
  environment: 'local' | 'development' | 'production';
  onError?: ErrorCallback;

  // ETHEREUM
  ethereumChain: ChainName;
  ethereumAutoConnect?: boolean;

  // SOLANA
  solanaConnection: solanaWeb3.Connection;
  solanaNetwork: solanaWeb3.Cluster;
  solanaAutoConnect?: boolean;
}

export interface AxyzSolanaContext {
  network: solanaWeb3.Cluster;
  autoConnect?: boolean;
  connection: solanaWeb3.Connection;
  isConnected?: boolean;
  publicKey?: PublicKey | null;
  wallets: SolanaWallet[];
  wallet?: SolanaWallet;
  connecting?: boolean;
  disconnecting?: boolean;
  signature?: string;
  signaturePublicKey?: PublicKey;
  nonceMessage?: string;
}

export interface AxyzContext extends AxyzContextArguments {
  entitlements?: EntitlementKeys;
  solana: AxyzSolanaContext;
  ethereum: AxyzEthereumContext;
}

class Context {
  context: AxyzContext;

  ethereum: AxyzEthereumContext;

  getEthereum: AxyzEthereumContext['get'];

  setEthereum: AxyzEthereumContext['set'];

  constructor(args: AxyzContextArguments) {
    // If there is a stored wallet name, preload it into the context so it can be auto-connected
    const solanaStoredWalletName = getSolanaStoredWalletName();
    const solanaWallets = getSolanaWallets(args.solanaNetwork);

    const solanaWallet = solanaStoredWalletName
      ? findSolanaWallet(solanaWallets, solanaStoredWalletName)
      : undefined;

    this.context = {
      ...args,
      ethereum: new AxyzEthereumContext({ chain: args.ethereumChain, onError: args.onError }),
      solana: {
        connection: args.solanaConnection,
        autoConnect: args.solanaAutoConnect,
        network: args.solanaNetwork,
        wallets: solanaWallets,
        wallet: solanaWallet,
      },
    };

    this.ethereum = this.context.ethereum;
    this.getEthereum = this.context.ethereum.get;
    this.setEthereum = this.context.ethereum.set;
  }

  get = <N extends keyof AxyzContext, I extends AxyzContext[N]>(name: N): I =>
    this.context[name] as I;

  getSolana = <N extends keyof AxyzSolanaContext, I extends AxyzSolanaContext[N]>(name: N): I =>
    this.context.solana[name] as I;

  getAll = () => this.context;

  set = <N extends keyof AxyzContext>(name: N, item: AxyzContext[N]) => {
    this.context[name] = item as AxyzContext[N];
  };

  setSolana = <N extends keyof AxyzSolanaContext>(name: N, item: AxyzSolanaContext[N]) => {
    this.context.solana[name] = item as AxyzSolanaContext[N];
  };
}

export default Context;
