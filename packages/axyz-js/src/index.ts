import axios from 'axios';
import { clusterApiUrl, Cluster, Connection } from '@solana/web3.js';

import Context from './utils/context';

import { CreateCheckEntitlements, CreateGetEntitlements, solana } from './actions';

import { AxyzAPIUrls, LOCAL, DEVELOPMENT, PRODUCTION } from './constants';

import { loadStoredSignatureAndMessage } from './solana/signature';
import * as solanaStoredWalletName from './solana/storedWalletName';

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

  // We store a nonce message and signature in session storage to avoid
  // having to re-sign the same message over and over again. This is only
  // persisted in session storage so that it is short-lived. This prevents
  // attacks where someone could potentially perform frequency analysis on
  // the signature.
  loadStoredSignatureAndMessage(context);

  const sdk = {
    apiKey,
    version: process.env.PACKAGE_VERSION!,
    checkEntitlements: CreateCheckEntitlements(api, context),
    getEntitlements: CreateGetEntitlements(api, context),
    get entitlements() {
      return context.get('entitlements');
    },

    solana: {
      connection: solanaConnection,
      getStoredWalletName: solanaStoredWalletName.getStoredWalletName,
      setStoredWalletName: solanaStoredWalletName.setStoredWalletName,
      mintToken: solana.CreateMintToken(api, context),
      connectWallet: solana.CreateConnectWallet(context),
      disconnectWallet: solana.CreateDisconnectWallet(context),
      clearWallet: solana.CreateClearWallet(context),
      autoConnect: solana.CreateAutoConnectWallet(context),
      sendTransaction: solana.CreateSendTransaction(context),
      signMessage: solana.CreateSignMessage(context),
      signTransaction: solana.CreateSignTransaction(context),
      signAllTransactions: solana.CreateSignAllTransactions(context),
      selectWallet: solana.CreateSelectWallet(context),
      get isConnected() {
        return context.getSolana('isConnected');
      },
      get publicKey() {
        return context.getSolana('publicKey');
      },
      get wallet() {
        return context.getSolana('wallet');
      },
      get wallets() {
        return context.getSolana('wallets');
      },
    },

    // ETHEREUM
    ethereum: context.ethereum,
  } as const;

  return sdk;
};

export * from './types';

export type { CheckEntitlementsResult } from './actions';

export type AxyzSDKInstance = ReturnType<typeof AxyzSDK>;

export default AxyzSDK;

export type { Options as AxyzSDKOptions };
