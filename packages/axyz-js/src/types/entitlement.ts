import type { Mint } from './mint';
import { NFT } from './nft';

export type Tokens = Array<Mint | NFT>;

export interface Entitlements {
  [entitlement: string]: Tokens;
}

export interface EntitlementMapping {
  [entitlementName: string]: {
    id: string;
    value: string;
  };
}
