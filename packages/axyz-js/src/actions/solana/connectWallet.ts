import { setStoredWalletName } from '../../solana/storedWalletName';
import { findWallet } from '../../solana';

import type { SolanaWallet } from '../../types';
import type Context from '../../utils/context';
import { createOrLoadNonceMessageSignature } from '../../solana/signMessage';

// eslint-disable-next-line import/prefer-default-export
export const CreateConnectWallet = (context: Context) => {
  const connectWallet = async (name?: string): Promise<SolanaWallet> => {
    let wallet = context.getSolana('wallet');

    context.setSolana('connecting', true);

    if (!wallet && !name) {
      throw new Error('No wallet found. Ensure you have selected a wallet.');
    }

    if (!wallet && name) {
      wallet = findWallet(context.getSolana('wallets'), name);
      setStoredWalletName(wallet.name);
    }

    if (!wallet) {
      throw new Error('No wallet found.');
    }

    await wallet.connect();

    context.setSolana('connecting', false);
    context.setSolana('publicKey', wallet.publicKey);
    context.setSolana('isConnected', true);

    await createOrLoadNonceMessageSignature(context, wallet);

    return wallet;
  };

  return connectWallet;
};
