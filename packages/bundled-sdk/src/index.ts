import axios from 'axios';
import { version } from '../package.json';

interface Options {
  environment: 'local' | 'dev' | 'prod';
}

enum BaseURL {
  local = 'http://localhost:3333',
  dev = 'https://dev.api.bundled.co',
  prod = 'https://api.bundled.co',
}

export const BundledSDK = (apiKey: string, { environment }: Options = { environment: 'local' }) => {
  const api = axios.create({
    baseURL: BaseURL[environment],
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
    connect,
    version,
  };
};

export default BundledSDK;
