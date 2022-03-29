import solanaWeb3, { PublicKey } from '@solana/web3.js';
import { AxiosInstance } from 'axios';

import {
  findWallet as findSolanaWallet,
  getWallets as getSolanaWallets,
  getStoredWalletName as getSolanaStoredWalletName,
} from '../solana';

import { getWallets as getEthereumWallets } from '../ethereum';

import type { EntitlementKeys, SolanaWallet, ErrorCallback } from '../types';
import type { ChainName, Address, EthereumWallet, EthereumWallets } from '../types/ethereum';
import { getSupportedChain } from '../ethereum/chains';
import setupWalletListeners from '../ethereum/setupWalletListeners';

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

export interface AxyzEthereumContext {
  address?: Address | null;
  isConnected?: boolean;
  isConnecting?: boolean;
  isDiconnecting?: boolean;
  wallet?: EthereumWallet | null;
  wallets: EthereumWallets;
  signature?: string;
  signatureAddress?: Address;
  nonceMessage?: string;
}

export interface AxyzContext extends AxyzContextArguments {
  entitlements?: EntitlementKeys;

  solana: AxyzSolanaContext;
  ethereum: AxyzEthereumContext;
}

class Context {
  context: AxyzContext;

  constructor(args: AxyzContextArguments) {
    const ethereumWallets = getEthereumWallets(getSupportedChain(args.ethereumChain));

    ethereumWallets.forEach((wallet) => setupWalletListeners(wallet, this, args.onError));

    // If there is a stored wallet name, preload it into the context so it can be auto-connected

    const solanaStoredWalletName = getSolanaStoredWalletName();
    const solanaWallets = getSolanaWallets(args.solanaNetwork);

    const solanaWallet = solanaStoredWalletName
      ? findSolanaWallet(solanaWallets, solanaStoredWalletName)
      : undefined;

    this.context = {
      ...args,
      ethereum: {
        wallets: ethereumWallets,
      },
      solana: {
        connection: args.solanaConnection,
        autoConnect: args.solanaAutoConnect,
        network: args.solanaNetwork,
        wallets: solanaWallets,
        wallet: solanaWallet,
      },
    };
  }

  get<N extends keyof AxyzContext, I extends AxyzContext[N]>(name: N): I {
    return this.context[name] as I;
  }

  getSolana<N extends keyof AxyzSolanaContext, I extends AxyzSolanaContext[N]>(name: N): I {
    return this.context.solana[name] as I;
  }

  getEthereum<N extends keyof AxyzEthereumContext, I extends AxyzEthereumContext[N]>(name: N): I {
    return this.context.ethereum[name] as I;
  }

  getAll() {
    return this.context;
  }

  set<N extends keyof AxyzContext>(name: N, item: AxyzContext[N]) {
    this.context[name] = item as AxyzContext[N];
  }

  setSolana<N extends keyof AxyzSolanaContext>(name: N, item: AxyzSolanaContext[N]) {
    this.context.solana[name] = item as AxyzSolanaContext[N];
  }

  setEthereum<N extends keyof AxyzEthereumContext>(name: N, item: AxyzEthereumContext[N]) {
    this.context.ethereum[name] = item as AxyzEthereumContext[N];
  }
}

export default Context;
