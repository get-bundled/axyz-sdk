import { AxiosInstance } from 'axios';
import Context from '../utils/context';
import { getEntitlementKeys } from '../api/getEntitlementKeys';

// eslint-disable-next-line import/prefer-default-export
export const CreateGetEntitlements = (api: AxiosInstance, context: Context) => {
  const getEntitlements = async () => getEntitlementKeys(api, context);

  return getEntitlements;
};
