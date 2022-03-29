import { setStoredWalletName } from '../../solana/storedWalletName';

import type { SolanaWallet } from '../../types';
import type Context from '../../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateSelectWallet = (context: Context) => {
  const selectWallet = (wallet: SolanaWallet) => {
    setStoredWalletName(wallet.name);
    context.setSolana('wallet', wallet);
  };

  return selectWallet;
};
