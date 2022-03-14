import { AxiosInstance } from 'axios';
import validateEntitlement from '../api/validateEntitlement';

import Context from '../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateCheckEntitlement = (api: AxiosInstance, context: Context) => {
  const checkEntitlement = async (entitlementKey: string) => {
    const publicKey = context.get('publicKey');

    if (!publicKey) {
      throw new Error('Public key not found. Please ensure a wallet is connected.');
    }

    if (!entitlementKey) {
      throw new Error('Entitlement is required.');
    }

    try {
      const validation = await validateEntitlement(api, context, entitlementKey);
      return validation;
    } catch (error) {
      return {
        errors: ['Could not validate entitlement.'],
        chain: 'SOL',
        entitlement: entitlementKey,
        isEntitledByMint: false,
        isEntitledByNFT: false,
        matchedNFTs: [],
        isEntitled: false,
      };
    }
  };
  return checkEntitlement;
};
