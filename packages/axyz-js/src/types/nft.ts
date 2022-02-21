export interface NFT {
  type: 'NFT';
  name: string;
  publicKey: string;
  chain: string;
  collection: string;
  imageUrl: string;
}
