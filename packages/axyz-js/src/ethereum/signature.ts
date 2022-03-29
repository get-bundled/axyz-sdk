import { generateNonce, SiweMessage } from 'siwe';

import { Address, EthereumWallet } from '../types/ethereum';
import canUseDOM from '../utils/canUseDOM';
import type Context from '../utils/context';

export const ETH_SIGNATURE_STORAGE_KEY = 'axyz:eth:signature';

type StoredMessageAndSignature = { message: string; signature: string; signatureAddress: string };

export const loadStoredEthereumSignatureAndMessage = (
  context: Context
): StoredMessageAndSignature | null => {
  if (!canUseDOM) return null;
  try {
    const signatureAndMessage = sessionStorage.getItem(ETH_SIGNATURE_STORAGE_KEY);
    if (signatureAndMessage) {
      const { message, signature, signatureAddress } = JSON.parse(
        signatureAndMessage
      ) as StoredMessageAndSignature;

      context.setEthereum('signature', signature);
      context.setEthereum('signatureAddress', signatureAddress);
      context.setEthereum('nonceMessage', message);

      return { message, signature, signatureAddress };
    }
  } catch (error) {
    // session storage not available
  }
  return null;
};

export const setStoredEthereumSignature = (
  context: Context,
  signature: string,
  address: Address,
  message: string
) => {
  if (!canUseDOM) return;
  try {
    context.setEthereum('signature', signature);
    context.setEthereum('nonceMessage', message);
    // We store the address so that if the wallet has changed, we can generate a new signature
    context.setEthereum('signatureAddress', address);

    sessionStorage.setItem(
      ETH_SIGNATURE_STORAGE_KEY,
      JSON.stringify({ message, signature, signatureAddress: address })
    );
  } catch (error) {
    // session storage not available
  }
};

export const clearStoredEthereumSignature = (context: Context) => {
  if (!canUseDOM) return;
  try {
    context.setEthereum('signature', undefined);
    context.setEthereum('signatureAddress', undefined);
    context.setEthereum('nonceMessage', undefined);

    sessionStorage.removeItem(ETH_SIGNATURE_STORAGE_KEY);
  } catch (error) {
    // session storage not available
  }
};

export const message = 'Sign this message to log in (getaxyz.com)';

export const createOrLoadEthereumNonceMessageSignature = async (
  context: Context,
  wallet: EthereumWallet
) => {
  const domain = window.location.host;
  const { origin } = window.location;

  const address = await wallet.getAccount();
  const savedSignature = context.getEthereum('signature');
  const savedAddress = context.getEthereum('signatureAddress');
  const savedMessage = context.getEthereum('nonceMessage');

  if (savedSignature && savedMessage && savedAddress === address) {
    return { signature: savedSignature, message: savedMessage };
  }

  try {
    const signer = await wallet.getSigner();
    const siweMessage = new SiweMessage({
      domain,
      address: await signer.getAddress(),
      statement: message,
      nonce: generateNonce(),
      uri: origin,
      version: '1',
      chainId: await wallet.getChainId(),
    });
    const signature = siweMessage.prepareMessage();

    if (signature) {
      setStoredEthereumSignature(context, signature, address, message);
      return { signature, message };
    }

    return { signature: null, message: null };
  } catch (error) {
    const e = error as Error;
    return { signature: null, message: null, error: e.message || 'Could not sign message.' };
  }
};
