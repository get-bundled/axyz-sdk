import axios, { AxiosInstance } from 'axios';
import config from './config';

interface MintTokenResponse {
  success: boolean;
  message: string;
}

export interface MintTokenResult extends Partial<MintTokenResponse> {
  error?: string;
}

const CreateMintToken = (api: AxiosInstance) => {
  const mintToken = async (mintId: string): Promise<MintTokenResult> => {
    try {
      if (!config.bundledUserId) {
        return {
          error: 'Bundled UserID is not set. Please ensure you have called "connect" first.',
        };
      }

      const response = await api.post<Omit<Required<MintTokenResponse>, 'error'>>(
        `/api/mint/${mintId}`,
        {
          headers: { 'x-user-id': config.bundledUserId },
        }
      );

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

export default CreateMintToken;