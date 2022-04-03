import { PublicKey } from '@solana/web3.js';
import base58 from 'bs58';
import { generateNonce } from 'siwe';

import canUseDOM from '../utils/canUseDOM';
import { axyzMessage } from '../constants';

import type { SolanaWallet } from '../types';
import type AxyzSolanaContext from './context';

export const SIGNATURE_STORAGE_KEY = 'axyz:signature';

type StoredMessageAndSignature = {
  message?: string;
  signature?: string;
  signaturePublicKey?: string;
};

const encoder = new TextEncoder();

export const loadStoredSignatureAndMessage = (): StoredMessageAndSignature => {
  if (!canUseDOM) return {};
  try {
    const signatureAndMessage = sessionStorage.getItem(SIGNATURE_STORAGE_KEY);
    if (signatureAndMessage) {
      const { message, signature, signaturePublicKey } = JSON.parse(
        signatureAndMessage
      ) as StoredMessageAndSignature;
      return { message, signature, signaturePublicKey };
    }
  } catch (error) {
    // session storage not available
  }
  return {};
};

export const setStoredSignature = (
  context: AxyzSolanaContext,
  signature: string,
  publicKey: PublicKey,
  message: string
) => {
  if (!canUseDOM) return;
  try {
    sessionStorage.setItem(
      SIGNATURE_STORAGE_KEY,
      JSON.stringify({ signature, message, signaturePublicKey: publicKey.toBase58() })
    );
  } catch (error) {
    // session storage not available
  }
};

export const clearStoredSignature = (context?: AxyzSolanaContext) => {
  if (!canUseDOM) return;
  try {
    context?.setMany({
      signature: undefined,
      signaturePublicKey: undefined,
      signatureMessage: undefined,
    });
    sessionStorage.removeItem(SIGNATURE_STORAGE_KEY);
  } catch (error) {
    // session storage not available
  }
};

export const messageWithNonce = `${axyzMessage}: ${generateNonce()}`;

export const createOrLoadMessageSignature = async (
  context: AxyzSolanaContext,
  wallet: SolanaWallet
) => {
  const savedSignature = context.get('signature');
  const savedSignaturePublicKey = context.get('signaturePublicKey');
  const savedMessage = context.get('signatureMessage');

  if (savedSignature && savedMessage && savedSignaturePublicKey?.equals(wallet.publicKey!)) {
    return { signature: savedSignature, message: savedMessage };
  }

  const message = encoder.encode(messageWithNonce);

  try {
    const signature = await wallet.signMessage(encoder.encode(messageWithNonce));

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
