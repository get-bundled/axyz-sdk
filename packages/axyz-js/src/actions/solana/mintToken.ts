import axios, { type AxiosInstance } from 'axios';

import doMintToken, { MintTokenResponse } from '../../api/mintToken';
import type Context from '../../utils/context';

export interface MintTokenResult extends Partial<MintTokenResponse> {
  error?: string;
}

export const CreateMintToken = (api: AxiosInstance, context: Context) => {
  const mintToken = async (mintId: string): Promise<MintTokenResult> => {
    try {
      const publicKey = context.getSolana('publicKey');

      if (!publicKey) {
        return {
          error: 'Public key not found. Please ensure a wallet is connected.',
        };
      }

      return doMintToken(api, mintId, publicKey);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || 'Failed to mint token.' };
      }
      return { error: 'Failed to mint token.' };
    }
  };
  return mintToken;
};
