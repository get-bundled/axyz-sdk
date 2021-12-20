import axios, { AxiosInstance } from 'axios';
import type { BundledSDKInstance } from '.';

interface MintTokenResponse {
  success: boolean;
  message: string;
}

export interface MintTokenResult extends Partial<MintTokenResponse> {
  error?: string;
}

const CreateMintToken = (
  api: AxiosInstance,
  getBundledUserId: () => BundledSDKInstance['bundledUserId']
) => {
  const mintToken = async (mintId: string): Promise<MintTokenResult> => {
    try {
      const bundledUserId = getBundledUserId();

      if (!bundledUserId) {
        return {
          error: 'Bundled UserID is not set. Please ensure you have called "connect" first.',
        };
      }

      const response = await api.post<Omit<Required<MintTokenResponse>, 'error'>>(
        `/api/mint/${mintId}`,
        undefined,
        {
          headers: { 'x-user-id': bundledUserId },
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
