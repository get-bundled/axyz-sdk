import { AxiosInstance } from 'axios';
import checkTokenBalances from '../utils/checkTokenBalances';
import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateCheckEntitlement = (api: AxiosInstance, context: Context) => {
  const checkEntitlement = async (entitlementName: string) => {
    const entitlements = context.get('entitlements');

    if (!entitlementName) {
      throw new Error('Entitlement is required.');
    }

    if (!entitlements) {
      throw new Error(
        'Entitlements map not found. Ensure you have called `getEntitlements` first.'
      );
    }

    const mintsForEntitlement = entitlements[entitlementName];

    if (!mintsForEntitlement) {
      throw new Error(`Entitlement ${entitlementName} not found.`);
    }

    const isEntitled = checkTokenBalances(context, mintsForEntitlement);

    return { entitlement: entitlementName, isEntitled };
  };
  return checkEntitlement;
};
