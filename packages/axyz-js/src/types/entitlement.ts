import type { SupportedChain } from './chain';

export type EntitlementKeys = Array<{
  id: string;
  value: string;
  chains: SupportedChain[];
}>;
