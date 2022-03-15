import { AxiosInstance } from 'axios';
import {
  validateEntitlements,
  ValidateEntitlementsResponse,
  getErrorState,
} from '../api/validateEntitlements';

import Context from '../utils/context';

export interface CheckEntitlementsResult extends ValidateEntitlementsResponse {}

// eslint-disable-next-line import/prefer-default-export
export const CreateCheckEntitlements = (api: AxiosInstance, context: Context) => {
  const checkEntitlements = async (entitlementKeys: string[]) => {
    const publicKey = context.get('publicKey');
    const wallet = context.get('wallet');

    if (!publicKey || !wallet) {
      return getErrorState('Public key or wallet not found. Please ensure a wallet is connected.');
    }

    if (!('signMessage' in wallet)) {
      return getErrorState('Wallet does not support signing.');
    }

    if (!entitlementKeys) {
      return getErrorState('No entitlement keys provided');
    }

    try {
      const validation = await validateEntitlements(api, context, entitlementKeys);
      return validation;
    } catch (error) {
      return getErrorState('Could not validate entitlements');
    }
  };
  return checkEntitlements;
};
