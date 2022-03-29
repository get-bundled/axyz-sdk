import { BaseMessageSignerWalletAdapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getWalletAdapters } from '@solana/wallet-adapter-wallets';
import type { Cluster } from '@solana/web3.js';

import type { SolanaWallet } from '../types';

export interface WalletTypes {
  wallets: SolanaWallet[];
  installed: SolanaWallet[];
  undetected: SolanaWallet[];
  loadable: SolanaWallet[];
}

export const findWallet = (wallets: SolanaWallet[], name: string) => {
  const foundWallet = wallets.find((wallet) => wallet.name === name);

  if (!foundWallet) throw new Error(`${name} wallet not found.`);

  return foundWallet;
};

export const getWallets = (solanaNetwork: Cluster) => {
  const solanaWallets = getWalletAdapters({
    network: solanaNetwork as WalletAdapterNetwork,
  }).filter((wallet) => 'signMessage' in wallet) as BaseMessageSignerWalletAdapter[];

  return solanaWallets;
};
