import axios, { AxiosInstance } from 'axios';

interface GetEntitlementResponse {
  entitled: true;
  expiresIn: number;
  expiresAt: number;
}

export interface GetEntitlementResult extends Partial<GetEntitlementResponse> {
  error?: string;
}

const CreateGetEntitlement = (api: AxiosInstance) => {
  const getEntitlement = async (): Promise<GetEntitlementResult> => {
    try {
      const response = await api.get<Omit<Required<GetEntitlementResponse>, 'error'>>(
        '/api/connect'
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
