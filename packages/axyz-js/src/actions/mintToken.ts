import axios, { AxiosInstance } from 'axios';
import Context from '../utils/context';

interface MintTokenResponse {
  success: boolean;
  message: string;
}

export interface MintTokenResult extends Partial<MintTokenResponse> {
  error?: string;
}

export const CreateMintToken = (api: AxiosInstance, context: Context) => {
  const mintToken = async (mintId: string): Promise<MintTokenResult> => {
    try {
      const publicKey = context.get('publicKey');

      if (!publicKey) {
        return {
          error: 'Public key not found. Please ensure a wallet is connected.',
        };
      }

      const response = await api.post<MintTokenResponse>(`/api/mint/${mintId}`, undefined, {
        headers: { 'x-public-key': publicKey.toBase58() },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || 'Failed to mint token.' };
      }
      return { error: 'Failed to mint token.' };
    }
  };
  return mintToken;
};
