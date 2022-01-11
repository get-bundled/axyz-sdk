import axios from 'axios';
import CreateConnect, { ConnectResult } from './connect';
import CreateGetEntitlement, { GetEntitlementResult } from './getEntitlement';
import CreateMintToken from './mintToken';

interface Options {
  environment: 'local' | 'dev' | 'prod';
  bundledUserId?: string;
}

enum BaseURL {
  local = 'http://localhost:3333',
  dev = 'https://api-dev.getbundled.co',
  prod = 'https://api.getbundled.co',
}

export interface BundledSDKInstance {
  apiKey: string;
  connect: ReturnType<typeof CreateConnect>;
  getEntitlement: ReturnType<typeof CreateGetEntitlement>;
  mintToken: ReturnType<typeof CreateMintToken>;
  bundledUserId?: string;
  publicKey?: string;
  version: string;
}

export const BundledSDK = (
  apiKey: string,
  { environment, bundledUserId }: Options = { environment: 'local' }
) => {
  const api = axios.create({
    baseURL: BaseURL[environment],
    headers: {
      'x-api-key': apiKey,
    },
  });

  const sdk: BundledSDKInstance = {
    apiKey,
    bundledUserId,
    connect: CreateConnect(api, (id: string, publicKey: string) => {
      sdk.bundledUserId = id;
      sdk.publicKey = publicKey;
    }),
    getEntitlement: CreateGetEntitlement(api, () => sdk.bundledUserId),
    mintToken: CreateMintToken(api, () => sdk.bundledUserId),
    version: 0.3.1
  };

  return sdk;
};

export default BundledSDK;

export type { ConnectResult, GetEntitlementResult, Options as BundledSDKOptions };
