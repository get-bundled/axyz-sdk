import { DEVELOPMENT, LOCAL, PRODUCTION } from './environments';

export const LOCAL_URL = 'http://localhost:3333';
export const DEVELOPMENT_URL = 'https://api-dev.getbundled.co';
export const PRODUCTION_URL = 'https://api.getbundled.co';

export const BundledAPIUrls = {
  [LOCAL]: LOCAL_URL,
  [DEVELOPMENT]: DEVELOPMENT_URL,
  [PRODUCTION]: PRODUCTION_URL,
};
