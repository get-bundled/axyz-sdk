import { AxiosInstance, AxiosRequestHeaders } from 'axios';
import checkWalletConnection from '../solana/checkWalletConnection';
import Context from '../utils/context';
import { createOrLoadNonceMessageSignature as getSolanaSignature } from '../solana/signMessage';
import { createOrLoadEthereumNonceMessageSignature as getEthereumSignature } from '../ethereum/signature';

import type { MetaplexNFTWithMetadata } from '../types/solana/nft';
import type { SupportedChain } from '../types';

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
  entitlementKeys: string[],
  chains: SupportedChain[]
) => {
  const headers: AxiosRequestHeaders = {};

  if (chains.includes('SOL') && context.getSolana('isConnected')) {
    const wallet = checkWalletConnection(context.getSolana('wallet'));
    const publicKey = context.getSolana('publicKey')!;
    const { signature, message, error } = await getSolanaSignature(context, wallet);

    if (!error && signature && message) {
      headers['x-sol-signature'] = signature;
      headers['x-sol-message'] = message;
      headers['x-sol-public-key'] = publicKey.toBase58();
    }
  }

  if (chains.includes('ETH') && context.getEthereum('isConnected')) {
    const wallet = context.getEthereum('wallet');
    const address = context.getEthereum('address');
    const { signature, message, error } = await getEthereumSignature(context, wallet!);

    if (!error && signature && message) {
      headers['x-eth-signature'] = signature;
      headers['x-eth-message'] = message;
      headers['x-eth-address'] = address!;
    }
  }

  const response = await api.get<ValidateEntitlementsResponse>('/entitlements/validate', {
    params: { entitlements: entitlementKeys.join(',') },
    headers,
  });

  return response.data;
};
