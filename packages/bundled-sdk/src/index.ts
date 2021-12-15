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

  const connect = async (username: string, password: string) => {
    const response = await api.post<{ publicKey: string }>('/api/connect', undefined, {
      auth: { username, password },
    });

    const { publicKey } = response.data;

    return {
      publicKey,
    };
  };

  return {
    apiKey,
    version: config.version,
    bundledUserId: config.bundledUserId,
    connect,
  };
};

export default BundledSDK;
