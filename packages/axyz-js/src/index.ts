import axios from 'axios';
import { clusterApiUrl, Cluster, Connection } from '@solana/web3.js';

import Context from './utils/context';

import { CreateCheckEntitlements, CreateGetEntitlements } from './actions';

import { AxyzAPIUrls, LOCAL, DEVELOPMENT, PRODUCTION } from './constants';

import type { ErrorCallback } from './types';
import type { ChainName } from './types/ethereum';

interface Options {
  environment?: typeof LOCAL | typeof DEVELOPMENT | typeof PRODUCTION;
  solanaNetwork?: Cluster;
  solanaConnection?: Connection;
  solanaAutoConnect?: boolean;
  ethereumChain?: ChainName;
  ethereumAutoConnect?: boolean;
  onError?: ErrorCallback;
}

export const AxyzSDK = (
  apiKey: string,
  {
    environment = 'local',
    solanaNetwork = 'devnet',
    solanaConnection = new Connection(clusterApiUrl(solanaNetwork)),
    solanaAutoConnect = true,
    ethereumChain = 'ropsten',
    ethereumAutoConnect = true,
    onError,
  }: Options = {}
) => {
  const api = axios.create({
    baseURL: AxyzAPIUrls[environment],
    headers: {
      'x-api-key': apiKey,
    },
  });

  const context = new Context({
    apiKey,
    api,
    environment,
    solanaNetwork,
    solanaAutoConnect,
    solanaConnection,
    ethereumChain,
    ethereumAutoConnect,
    onError,
  });

  const sdk = {
    apiKey,
    version: process.env.PACKAGE_VERSION!,
    checkEntitlements: CreateCheckEntitlements(api, context),
    getEntitlements: CreateGetEntitlements(api, context),
    get entitlements() {
      return context.get('entitlements');
    },

    solana: context.solana,
    ethereum: context.ethereum,
  } as const;

  return sdk;
};

export * from './types';

export type { CheckEntitlementsResult } from './actions';

export type AxyzSDKInstance = ReturnType<typeof AxyzSDK>;

export default AxyzSDK;

export type { Options as AxyzSDKOptions };
