import type { SOL } from '.';

export interface MetaplexCollection {
  name: string;
  family: string;
}
export interface MetaplexCreator {
  address: string;
  share: number;
}
export interface MetaplexFile {
  uri: string;
  type: string;
}

export interface MetaplexProperties {
  files: MetaplexFile[];
  category: string;
  creators: MetaplexCreator[];
  collection: MetaplexCollection;
}

export interface MetaplexAttribute {
  trait_type: string;
  value: string;
}

export interface MetaplexMetadata {
  name: string;
  symbol: string;
  description: string;
  external_url: string;
  seller_fee_basis_points: number;
  image: string;
  attributes: MetaplexAttribute[];
  properties: MetaplexProperties;
}

export interface MetaplexNFTWithMetadata {
  name: string;
  symbol: string;
  metadataUri: string;
  chain: SOL;
  metadata?: MetaplexMetadata;
}
