import Context from '../utils/context';
import doGetEntitlementByValue from '../utils/getEntitlementByValue';

// eslint-disable-next-line import/prefer-default-export
export const CreateGetEntitlementByValue = (context: Context) => {
  const getEntitlementByValue = (entitlementValue: string) =>
    doGetEntitlementByValue(context, entitlementValue);

  return getEntitlementByValue;
};
