import { AxiosInstance } from 'axios';
import getEntitlements from '../api/getEntitlements';
import checkTokenBalances from '../utils/checkTokenBalances';
import Context from '../utils/context';
import getEntitlementByValue from '../utils/getEntitlementByValue';

// eslint-disable-next-line import/prefer-default-export
export const CreateCheckEntitlementByValue = (api: AxiosInstance, context: Context) => {
  const checkEntitlementByValue = async (entitlementValue: string) => {
    const hasEntitlements = context.get('entitlements');

    try {
      if (!hasEntitlements) {
        await getEntitlements(api, context);
      }

      const mintsForEntitlement = getEntitlementByValue(context, entitlementValue);

      const isEntitled = await checkTokenBalances(context, mintsForEntitlement);

      return { isEntitled };
    } catch (error) {
      return { error: error as Error };
    }
  };
  return checkEntitlementByValue;
};
