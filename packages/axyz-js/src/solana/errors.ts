import { WalletError } from '@solana/wallet-adapter-base';

// eslint-disable-next-line import/prefer-default-export
export class WalletNotSelectedError extends WalletError {
  name = 'WalletNotSelectedError';
}
