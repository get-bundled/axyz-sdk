import type { EntitlementKeys, SupportedChain } from '../types';

const getRequiredChainsForEntitlements = (
  entitlementKeysToCheck: string[],
  entitlements: EntitlementKeys
): SupportedChain[] => {
  const chains = [
    ...new Set(
      entitlements!
        .filter((e) => entitlementKeysToCheck.includes(e.value))
        .map((e) => e.chains)
        .flat()
    ),
  ];

  return chains;
};

export default getRequiredChainsForEntitlements;
