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
    connect: CreateConnect(api, (id) => {
      sdk.bundledUserId = id;
    }),
    getEntitlement: CreateGetEntitlement(api),
    mintToken: CreateMintToken(api),
  };

  return sdk;
};

export default BundledSDK;

export type { ConnectResult, GetEntitlementResult, Options as BundledSDKOptions };
