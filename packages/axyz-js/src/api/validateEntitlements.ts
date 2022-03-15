import { AxiosInstance } from 'axios';
import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';
import { createOrLoadNonceMessageSignature } from '../utils/signMessage';

import { MetaplexNFTWithMetadata } from '../types/nft/solana';

export interface ValidateEntitlementsResponse {
  errors: string[];
  entitlements: string[];
  isEntitledByMint: boolean;
  isEntitledByNFT: boolean;
  matchedNFTs: MetaplexNFTWithMetadata[];
  isEntitled: boolean;
}

export const getErrorState = (error: string) => ({
  errors: [error],
  entitlements: [],
  isEntitledByMint: false,
  isEntitledByNFT: false,
  matchedNFTs: [],
  isEntitled: false,
});

export const validateEntitlements = async (
  api: AxiosInstance,
  context: Context,
  entitlementKeys: string[]
) => {
  const wallet = checkWalletConnection(context.get('wallet'));
  const publicKey = context.get('publicKey')!;
  const { signature, message, error } = await createOrLoadNonceMessageSignature(context, wallet);

  if (!signature || !message || error) {
    return getErrorState(error || 'Could not create message signature.');
  }

  const response = await api.get<ValidateEntitlementsResponse>('/entitlements/validate', {
    params: { entitlements: entitlementKeys.join(',') },
    headers: {
      'x-signature': signature,
      'x-message': message,
      'x-public-key': publicKey.toBase58(),
    },
  });

  return response.data;
};
