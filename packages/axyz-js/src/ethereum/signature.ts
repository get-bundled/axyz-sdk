import { generateNonce, SiweMessage } from 'siwe';
import { axyzMessage } from '../constants';

import { Address, EthereumWallet } from '../types/ethereum';
import canUseDOM from '../utils/canUseDOM';

import type AxyzEthereumContext from './context';

export const ETH_SIGNATURE_STORAGE_KEY = 'axyz:eth:signature';

type StoredMessageAndSignature = {
  message?: string;
  signature?: string;
  signatureAddress?: string;
};

export const loadStoredSignatureAndMessage = (): StoredMessageAndSignature => {
  if (!canUseDOM) return {};
  try {
    const signatureAndMessage = sessionStorage.getItem(ETH_SIGNATURE_STORAGE_KEY);
    if (signatureAndMessage) {
      const { message, signature, signatureAddress } = JSON.parse(
        signatureAndMessage
      ) as StoredMessageAndSignature;

      return { message, signature, signatureAddress };
    }
  } catch (error) {
    // session storage not available
  }
  return {};
};

export const setStoredSignature = (signature: string, address: Address, message: string) => {
  if (!canUseDOM) return;
  try {
    sessionStorage.setItem(
      ETH_SIGNATURE_STORAGE_KEY,
      JSON.stringify({ message, signature, signatureAddress: address })
    );
  } catch (error) {
    // session storage not available
  }
};

export const clearStoredSignature = (context: AxyzEthereumContext) => {
  if (!canUseDOM) return;
  try {
    context.setMany({
      signature: '',
      signatureAddress: '',
      signatureMessage: '',
    });

    sessionStorage.removeItem(ETH_SIGNATURE_STORAGE_KEY);
  } catch (error) {
    // session storage not available
  }
};

export const createOrLoadMessageSignature = async (
  context: AxyzEthereumContext,
  wallet: EthereumWallet
) => {
  const domain = window.location.host;
  const { origin } = window.location;

  const address = await wallet.getAccount();
  const savedSignature = context.get('signature');
  const savedAddress = context.get('signatureAddress');
  const savedMessage = context.get('signatureMessage');

  if (savedSignature && savedMessage && savedAddress === address) {
    return { signature: savedSignature, message: savedMessage };
  }

  if (savedSignature && savedMessage && savedAddress !== address) {
    clearStoredSignature(context);
  }

  try {
    const signer = await wallet.getSigner();
    const siwe = new SiweMessage({
      domain,
      address: await signer.getAddress(),
      statement: axyzMessage,
      nonce: generateNonce(),
      uri: origin,
      version: '1',
      chainId: await wallet.getChainId(),
    });

    const message = siwe.prepareMessage();

    const signature = await signer.signMessage(message);

    if (signature) {
      setStoredSignature(signature, address, message);
      return { signature, message };
    }

    return { signature: null, message: null };
  } catch (error) {
    const e = error as Error;
    return { signature: null, message: null, error: e.message || 'Could not sign message.' };
  }
};
