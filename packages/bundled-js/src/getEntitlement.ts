import axios, { AxiosInstance } from 'axios';
import config from './config';

interface GetEntitlementResponse {
  entitled: true;
  expiresIn: number;
  expiresAt: number;
}

export interface GetEntitlementResult extends Partial<GetEntitlementResponse> {
  error?: string;
}

const CreateGetEntitlement = (api: AxiosInstance) => {
  const getEntitlement = async (mintId: string): Promise<GetEntitlementResult> => {
    try {
      if (!config.bundledUserId) {
        return {
          error: 'Bundled UserID is not set. Please ensure you have called "connect" first.',
        };
      }

      const response = await api.get<Omit<Required<GetEntitlementResponse>, 'error'>>(
        '/api/entitlement',
        {
          params: {
            mintId,
          },
          headers: { 'x-user-id': config.bundledUserId },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || 'Failed to retrieve entitlements.' };
      }
      return { error: 'Failed to retrieve entitlements.' };
    }
  };
  return getEntitlement;
};

export default CreateGetEntitlement;
