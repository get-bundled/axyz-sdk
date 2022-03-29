import type { AxiosInstance } from 'axios';
import { getEntitlementKeys } from '../api';
import type Context from './context';

const getOrFetchEntitlementKeys = async (api: AxiosInstance, context: Context) => {
  let entitlements = context.get('entitlements');

  if (!entitlements) {
    entitlements = await getEntitlementKeys(api, context);
  }

  return entitlements;
};

export default getOrFetchEntitlementKeys;
