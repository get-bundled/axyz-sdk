import type Context from './context';

const getEntitlementByValue = (context: Context, entitlementValue: string) => {
  const entitlements = context.get('entitlements');

  if (!entitlements) {
    throw new Error('Could not find entitlements, please call `getEntitlements` first.');
  }

  const entitlement = entitlements[entitlementValue];

  if (!entitlement) {
    throw new Error(`Could not find entitlement with value: ${entitlementValue}`);
  }

  return entitlement;
};

export default getEntitlementByValue;
