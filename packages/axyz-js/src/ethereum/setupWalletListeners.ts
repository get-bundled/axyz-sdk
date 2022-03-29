import { EthereumWallet, ErrorCallback } from '../types';
import type Context from '../utils/context';
import {
  clearStoredEthereumSignature,
  createOrLoadEthereumNonceMessageSignature,
} from './signature';

const setupWalletListeners = (
  wallet: EthereumWallet,
  context: Context,
  onError?: ErrorCallback
) => {
  wallet.on('connect', async () => {
    const account = await wallet.getAccount();

    if (!account) {
      onError?.(new Error('Something went wrong connecting.'));
      return;
    }

    context.setEthereum('isConnected', true);
    context.setEthereum('wallet', wallet);
    context.setEthereum('address', account);

    createOrLoadEthereumNonceMessageSignature(context, wallet);
  });

  wallet.on('change', async () => {
    const account = await wallet.getAccount();

    if (!account) {
      onError?.(new Error('Something went wrong connecting.'));
      return;
    }

    clearStoredEthereumSignature(context);
    createOrLoadEthereumNonceMessageSignature(context, wallet);

    context.setEthereum('address', account);
  });

  wallet.on('disconnect', () => {
    clearStoredEthereumSignature(context);

    context.setEthereum('isConnected', false);
    context.setEthereum('address', null);
    context.setEthereum('wallet', null);
  });

  wallet.on('error', (error: Error) => {
    onError?.(error as Error);
  });
};

export default setupWalletListeners;
