import type { PublicKey } from '@solana/web3.js';
import type { AxiosInstance } from 'axios';

export interface MintTokenResponse {
  success: boolean;
  message: string;
}

const mintToken = async (api: AxiosInstance, mintId: string, publicKey: PublicKey) => {
  const response = await api.post<MintTokenResponse>(`/api/mint/${mintId}`, undefined, {
    headers: { 'x-public-key': publicKey.toBase58() },
  });

  return response.data;
};

export default mintToken;
