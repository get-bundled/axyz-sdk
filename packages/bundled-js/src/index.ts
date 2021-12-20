import axios from 'axios';
import CreateConnect, { ConnectResult } from './connect';
import { config, setBundledUserId } from './config';
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

export const BundledSDK = (
  apiKey: string,
  { environment, bundledUserId }: Options = { environment: 'local' }
) => {
  if (bundledUserId) {
    setBundledUserId(bundledUserId);
  }

  const api = axios.create({
    baseURL: BaseURL[environment],
    headers: {
      'x-api-key': apiKey,
    },
  });

  const connect = CreateConnect(api);
  const getEntitlement = CreateGetEntitlement(api);
  const mintToken = CreateMintToken(api);

  const sdk = {
    apiKey,
    bundledUserId: config.bundledUserId,
    connect,
    getEntitlement,
    mintToken,
    config,
  };

  return sdk;
};

export type BundledSDKInstance = ReturnType<typeof BundledSDK>;

export default BundledSDK;

export type { ConnectResult, GetEntitlementResult, Options as BundledSDKOptions };
