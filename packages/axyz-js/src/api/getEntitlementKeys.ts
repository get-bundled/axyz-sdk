import { AxiosInstance } from 'axios';
import { EntitlementKeys } from '../types/entitlement';
import Context from '../utils/context';

export interface GetEntitlementKeysResponse {
  entitlements: EntitlementKeys;
}

const getEntitlementKeys = async (api: AxiosInstance, context: Context) => {
  const response = await api.get<GetEntitlementKeysResponse>('/entitlements/keys');

  const { entitlements } = response.data;

  context.set('entitlements', entitlements);

  return entitlements;
};

export default getEntitlementKeys;
