import { AxiosInstance } from 'axios';
import { EntitlementMapping, Entitlements } from '../types';
import Context from '../utils/context';

interface GetEntitlementsResponse {
  entitlements: Entitlements;
  mapping: EntitlementMapping;
}
const getEntitlements = async (api: AxiosInstance, context: Context) => {
  const response = await api.get<GetEntitlementsResponse>('/entitlements');

  const { entitlements, mapping } = response.data;

  context.set('entitlements', entitlements);
  context.set('entitlementList', mapping);

  return { entitlements, mapping };
};

export default getEntitlements;
