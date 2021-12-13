import axios from 'axios';
import { clusterApiUrl, Cluster, Connection } from '@solana/web3.js';

import {
  CreateCheckEntitlement,
  CreateMintToken,
  CreateGetEntitlements,
  CreateConnectWallet,
  CreateDisconnectWallet,
  CreateGetEntitlementByValue,
  CreateAutoConnectWallet,
  CreateSendTransaction,
  CreateSignAllTransactions,
  CreateSignTransaction,
  CreateSignMessage,
  CreateClearWallet,
} from './actions';
import Context from './utils/context';
import { BundledAPIUrls, LOCAL, DEVELOPMENT, PRODUCTION } from './constants';
import type { Wallet } from './types';
import { getStoredWalletName, setStoredWalletName } from './utils/localStorage';
import { CreateCheckEntitlementByValue } from './actions/checkEntitlementByValue';

interface Options {
  environment?: typeof LOCAL | typeof DEVELOPMENT | typeof PRODUCTION;
  solanaNetwork?: Cluster;
  connection?: Connection;
  autoConnect?: boolean;
}

export const AxyzSDK = (
  apiKey: string,
  {
    environment = 'local',
    solanaNetwork = 'devnet',
    connection = new Connection(clusterApiUrl(solanaNetwork)),
    autoConnect = true,
  }: Options = {}
) => {
  const api = axios.create({
    baseURL: BundledAPIUrls[environment],
    headers: {
      'x-api-key': apiKey,
    },
  });

  const context = new Context({
    apiKey,
    connection,
    api,
    environment,
    solanaNetwork,
    autoConnect,
  });

  const sdk = {
    apiKey,
    version: process.env.PACKAGE_VERSION!,
    checkEntitlement: CreateCheckEntitlement(api, context),
    checkEntitlementByValue: CreateCheckEntitlementByValue(api, context),
    getEntitlementByValue: CreateGetEntitlementByValue(context),
    getEntitlements: CreateGetEntitlements(api, context),
    mintToken: CreateMintToken(api, context),
    connectWallet: CreateConnectWallet(context),
    disconnectWallet: CreateDisconnectWallet(context),
    clearWallet: CreateClearWallet(context),
    autoConnect: CreateAutoConnectWallet(context),
    sendTransaction: CreateSendTransaction(context),
    signMessage: CreateSignMessage(context),
    signTransaction: CreateSignTransaction(context),
    signAllTransactions: CreateSignAllTransactions(context),
    connection,
    getStoredWalletName,
    setStoredWalletName,
    selectWallet: (wallet: Wallet) => {
      setStoredWalletName(wallet.name);
      context.set('wallet', wallet);
    },
    get entitlements() {
      return context.get('entitlements');
    },
    get isConnected() {
      return context.get('isConnected');
    },
    get publicKey() {
      return context.get('publicKey');
    },
    get wallet() {
      return context.get('wallet');
    },
    get wallets() {
      return context.get('wallets');
    },
  } as const;

  return sdk;
};

export type AxyzSDKInstance = ReturnType<typeof AxyzSDK>;

export default AxyzSDK;

export type { Options as AxyzSDKOptions };
