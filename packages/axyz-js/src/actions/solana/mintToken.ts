import axios, { type AxiosInstance } from 'axios';

import doMintToken, { MintTokenResponse } from '../../api/mintToken';
import type AxyzSolanaContext from '../../solana/context';

export interface MintTokenResult extends Partial<MintTokenResponse> {
  error?: string;
}

export const CreateMintToken = (api: AxiosInstance, context: AxyzSolanaContext) => {
  const mintToken = async (mintId: string): Promise<MintTokenResult> => {
    try {
      const publicKey = context.get('publicKey');

      if (!publicKey) {
        return {
          error: 'Public key not found. Please ensure a wallet is connected.',
        };
      }

      const result = await doMintToken(api, mintId, publicKey);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || 'Failed to mint token.' };
      }
      return { error: 'Failed to mint token.' };
    }
  };
  return mintToken;
};
