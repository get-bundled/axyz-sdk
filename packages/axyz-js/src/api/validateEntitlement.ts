import { AxiosInstance } from 'axios';
import checkWalletConnection from '../utils/checkWalletConnection';
import Context from '../utils/context';
import signMessage from '../utils/signMessage';

import type { Chain } from '../types';
import { MetaplexNFTWithMetadata } from '../types/nft/solana';

export interface ValidateEntitlementsResponse {
  errors: string[];
  chain: Chain;
  entitlement: string;
  isEntitledByMint: boolean;
  isEntitledByNFT: boolean;
  matchedNFTs: MetaplexNFTWithMetadata[];
  isEntitled: boolean;
}

const validateEntitlement = async (
  api: AxiosInstance,
  context: Context,
  entitlementKey: string
) => {
  const wallet = checkWalletConnection(context.get('wallet'));
  const publicKey = context.get('publicKey')!;
  const message = 'getaxyz.com';
  const signature = await signMessage(Buffer.from(message), wallet);

  if (!signature) {
    throw new Error('Could not sign message');

    return {
      errors: ['Could not sign message with wallet.'],
      chain: 'SOL',
      entitlement: entitlementKey,
      isEntitledByMint: false,
      isEntitledByNFT: false,
      matchedNFTs: [],
      isEntitled: false,
    };
  }

  const response = await api.get<ValidateEntitlementsResponse>('/entitlements/validate', {
    params: { entitlement: entitlementKey },
    headers: {
      'x-signature': signature.toString(),
      'x-message': message,
      'x-public-key': publicKey.toString(),
    },
  });

  return response.data;
};

export default validateEntitlement;
