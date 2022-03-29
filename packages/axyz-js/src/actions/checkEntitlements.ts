import type { AxiosError, AxiosInstance } from 'axios';

import {
  validateEntitlements,
  ValidateEntitlementsResponse,
  getErrorState,
} from '../api/validateEntitlements';
import checkForConnectedWalletsOnChains from '../utils/checkForConnectedWalletsOnChains';
import getRequiredChainsForEntitlements from '../utils/getRequiredChainsForEntitlements';

import Context from '../utils/context';
import getOrFetchEntitlementKeys from '../utils/getOrFetchEntitlementKeys';

export interface CheckEntitlementsResult extends ValidateEntitlementsResponse {}

// eslint-disable-next-line import/prefer-default-export
export const CreateCheckEntitlements = (api: AxiosInstance, context: Context) => {
  const checkEntitlements = async (entitlementKeys: string[]) => {
    const publicKey = context.getSolana('publicKey');
    const wallet = context.getSolana('wallet');

    if (!publicKey || !wallet) {
      return getErrorState('Public key or wallet not found. Please ensure a wallet is connected.');
    }

    if (!entitlementKeys) {
      return getErrorState('No entitlement keys provided');
    }

    try {
      const entitlements = await getOrFetchEntitlementKeys(api, context);

      const chains = getRequiredChainsForEntitlements(entitlementKeys, entitlements!);

      const hasConnectedWalletForRequiredChain = checkForConnectedWalletsOnChains(chains, context);

      if (!hasConnectedWalletForRequiredChain) {
        return getErrorState(
          'No connected wallet found for required chains. Please ensure a wallet is connected.'
        );
      }

      try {
        const validation = await validateEntitlements(api, context, entitlementKeys, chains);

        return validation;
      } catch (error) {
        return getErrorState('Could not validate entitlements');
      }
    } catch (e) {
      return getErrorState((e as AxiosError).message);
    }
  };
  return checkEntitlements;
};
