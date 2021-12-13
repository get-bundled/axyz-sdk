import axios from 'axios';
import CreateConnect, { ConnectResult } from './connect';
import config from './config';
import CreateGetEntitlement, { GetEntitlementResult } from './getEntitlement';

interface Options {
  environment: 'local' | 'dev' | 'prod';
  bundledUserId?: string;
}

enum BaseURL {
  local = 'http://localhost:3333',
  dev = 'https://dev.api.bundled.co',
  prod = 'https://api.bundled.co',
}

export const BundledSDK = (
  apiKey: string,
  { environment, bundledUserId }: Options = { environment: 'local' }
) => {
  if (bundledUserId) {
    config.bundledUserId = bundledUserId;
  }

  const api = axios.create({
    baseURL: BaseURL[environment],
    headers: {
      'x-api-key': apiKey,
    },
  });

  const connect = CreateConnect(api);
  const getEntitlement = CreateGetEntitlement(api);

  return {
    apiKey,
    bundledUserId: config.bundledUserId,
    connect,
    getEntitlement,
  };
};

export interface BundledSDKInstance {
  apiKey: string;
  connect: ReturnType<typeof CreateConnect>;
  getEntitlement: ReturnType<typeof CreateGetEntitlement>;
  bundledUserId?: string;
}

export default BundledSDK;
export type { ConnectResult, GetEntitlementResult, Options as BundledSDKOptions };
