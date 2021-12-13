import { Wallet } from '../types';
import Context from '../utils/context';
import { setStoredWalletName } from '../utils/localStorage';

// eslint-disable-next-line import/prefer-default-export
export const CreateClearWallet = (context: Context) => {
  /**
   * @description If the user has changed their selected wallet but has not
   * connected to the new wallet yet, this function will clear the stale wallet reference
   * stored in the Axyz context.
   */
  const clearWallet = async (wallet: Wallet): Promise<void> => {
    const contextWallet = context.get('wallet');

    if (contextWallet && wallet.name === contextWallet.name) {
      setStoredWalletName(null);
      context.set('wallet', undefined);
      context.set('publicKey', undefined);
    }
  };

  return clearWallet;
};
