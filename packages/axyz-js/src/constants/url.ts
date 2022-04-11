import { DEVELOPMENT, LOCAL, PRODUCTION } from './environments';

export const LOCAL_URL = 'http://localhost:3333';
export const DEVELOPMENT_URL = 'https://api-dev.getaxyz.com';
export const PRODUCTION_URL = 'https://api.getaxyz.com';

export const AxyzAPIUrls = {
  [LOCAL]: LOCAL_URL,
  [DEVELOPMENT]: DEVELOPMENT_URL,
  [PRODUCTION]: PRODUCTION_URL,
};
