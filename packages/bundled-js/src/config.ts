import { Config } from './types';

const config: Config = {};

export { config };

export const setBundledUserId = (userId: string) => {
  config.bundledUserId = userId;
};
