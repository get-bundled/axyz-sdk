import type { SolanaWallet } from '../../types';
import type Context from '../../utils/context';
import { setStoredWalletName } from '../../solana/storedWalletName';

// eslint-disable-next-line import/prefer-default-export
export const CreateClearWallet = (context: Context) => {
  /**
   * @description If the user has changed their selected wallet but has not
   * connected to the new wallet yet, this function will clear the stale wallet reference
   * stored in the Axyz context.
   */
  const clearWallet = async (wallet: SolanaWallet): Promise<void> => {
    const contextWallet = context.getSolana('wallet');

    if (contextWallet && wallet.name === contextWallet.name) {
      setStoredWalletName(null);
      context.setSolana('wallet', undefined);
      context.setSolana('publicKey', undefined);
    }
  };

  return clearWallet;
};
