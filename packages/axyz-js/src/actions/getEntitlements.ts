import { AxiosInstance } from 'axios';
import Context from '../utils/context';
import getEntitlementsFetch from '../api/getEntitlements';

// eslint-disable-next-line import/prefer-default-export
export const CreateGetEntitlements = (api: AxiosInstance, context: Context) => {
  const getEntitlements = async () => getEntitlementsFetch(api, context);

  return getEntitlements;
};
