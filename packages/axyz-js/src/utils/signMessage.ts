import base58 from 'bs58';
import { v4 as uuidv4 } from 'uuid';

import { Wallet } from '../types/wallet';
import Context from './context';
import { setStoredSignature } from './signature';

const signMessage = (message: Uint8Array, wallet: Wallet) => {
  if (wallet && 'signMessage' in wallet) {
    return wallet.signMessage(message);
  }

  throw new Error('Wallet does not support signing');
};

export const messageWithNonce = `Sign this message to prove authenticity (getaxyz.com): ${uuidv4()}`;
const encoder = new TextEncoder();

export const createOrLoadNonceMessageSignature = async (context: Context, wallet: Wallet) => {
  const savedSignature = context.get('signature');
  const savedSignaturePublicKey = context.get('signaturePublicKey');
  const savedMessage = context.get('nonceMessage');

  if (savedSignature && savedMessage && savedSignaturePublicKey?.equals(wallet.publicKey!)) {
    return { signature: savedSignature, message: savedMessage };
  }

  const message = encoder.encode(messageWithNonce);

  try {
    const signature = await signMessage(encoder.encode(messageWithNonce), wallet);

    if (signature) {
      const base58Message = base58.encode(message);
      const base58Signature = base58.encode(signature);

      setStoredSignature(context, base58Signature, wallet.publicKey!, base58Message);
      return { signature: base58Signature, message: base58Message };
    }
    return { signature: null, message: null };
  } catch (error) {
    const e = error as Error;
    return { signature: null, message: null, error: e.message || 'Could not sign message.' };
  }
};

export default signMessage;
