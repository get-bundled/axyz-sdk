import type { Wallet } from '../types';

export interface WalletTypes {
  wallets: Wallet[];
  installed: Wallet[];
  undetected: Wallet[];
  loadable: Wallet[];
}

export const findWallet = (wallets: Wallet[], name: string) => {
  const foundWallet = wallets.find((wallet) => wallet.name === name);

  if (!foundWallet) throw new Error(`${name} wallet not found.`);

  return foundWallet;
};
