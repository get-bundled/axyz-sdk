import { WalletName } from '@solana/wallet-adapter-base';
import { WALLET_STORAGE_KEY } from '../constants';

type StoredWalletName = WalletName | null;

export const getStoredWalletName = (): StoredWalletName => {
  try {
    const walletName = localStorage.getItem(WALLET_STORAGE_KEY);
    if (walletName) {
      return JSON.parse(walletName) as WalletName;
    }
  } catch (error) {
    // local storage not available
  }
  return null;
};

export const setStoredWalletName = (walletName: WalletName | null) => {
  try {
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletName));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
