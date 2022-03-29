import { PublicKey } from '@solana/web3.js';
import canUseDOM from '../utils/canUseDOM';
import type Context from '../utils/context';

export const SIGNATURE_STORAGE_KEY = 'axyz:signature';

type StoredMessageAndSignature = { message: string; signature: string; signaturePublicKey: string };

export const loadStoredSignatureAndMessage = (
  context: Context
): StoredMessageAndSignature | null => {
  if (!canUseDOM) return null;
  try {
    const signatureAndMessage = sessionStorage.getItem(SIGNATURE_STORAGE_KEY);
    if (signatureAndMessage) {
      const { message, signature, signaturePublicKey } = JSON.parse(
        signatureAndMessage
      ) as StoredMessageAndSignature;
      context.setSolana('signature', signature);
      context.setSolana('signaturePublicKey', new PublicKey(signaturePublicKey));
      context.setSolana('nonceMessage', message);
      return { message, signature, signaturePublicKey };
    }
  } catch (error) {
    // session storage not available
  }
  return null;
};

export const setStoredSignature = (
  context: Context,
  signature: string,
  publicKey: PublicKey,
  message: string
) => {
  if (!canUseDOM) return;
  try {
    context.setSolana('signature', signature);
    context.setSolana('nonceMessage', message);

    // We store the public key so that if the wallet has changed, we can generate a new signature
    context.setSolana('signaturePublicKey', publicKey);

    sessionStorage.setItem(
      SIGNATURE_STORAGE_KEY,
      JSON.stringify({ signature, message, signaturePublicKey: publicKey.toBase58() })
    );
  } catch (error) {
    // session storage not available
  }
};

export const clearStoredSignature = (context: Context) => {
  if (!canUseDOM) return;
  try {
    context.setSolana('signature', undefined);
    context.setSolana('signaturePublicKey', undefined);
    context.setSolana('nonceMessage', undefined);
    sessionStorage.removeItem(SIGNATURE_STORAGE_KEY);
  } catch (error) {
    // session storage not available
  }
};
