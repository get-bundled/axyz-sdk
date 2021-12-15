import axios from 'axios';
import CreateConnect from './connect';
import config from './config';

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

  return {
    apiKey,
    version: config.version,
    bundledUserId: config.bundledUserId,
    connect,
  };
};

export default BundledSDK;
