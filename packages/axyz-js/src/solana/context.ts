import solanaWeb3, { PublicKey } from '@solana/web3.js';
import { AxiosInstance } from 'axios';

import {
  findWallet as findSolanaWallet,
  getWallets as getSolanaWallets,
  getStoredWalletName,
  loadStoredSignatureAndMessage,
} from '.';

import * as actions from '../actions/solana';

import type { SolanaWallet, ErrorCallback } from '../types';
import SolanaEvents from './events';
import setupEventListeners from './setupEventListeners';
import setupWalletListeners from './setupWalletListeners';

interface AxyzSolanaContextArgs {
  autoConnect: AxyzSolanaContext['autoConnect'];
  connection: AxyzSolanaContext['connection'];
  network: AxyzSolanaContext['network'];
  onError?: ErrorCallback;
  api: AxiosInstance;
}

class AxyzSolanaContext extends SolanaEvents {
  network: solanaWeb3.Cluster;

  autoConnect?: boolean;

  connection: solanaWeb3.Connection;

  isConnected?: boolean;

  publicKey?: PublicKey | null;

  wallets: SolanaWallet[];

  wallet?: SolanaWallet;

  connecting?: boolean;

  disconnecting?: boolean;

  signature?: string;

  signaturePublicKey?: PublicKey;

  signatureMessage?: string;

  mintToken: ReturnType<typeof actions.CreateMintToken>;

  constructor({ network, autoConnect, connection, onError, api }: AxyzSolanaContextArgs) {
    super();

    // If there is a stored wallet name, preload it into the context so it can be auto-connected
    const storedWalletName = getStoredWalletName();
    const wallets = getSolanaWallets(network);

    const wallet = storedWalletName ? findSolanaWallet(wallets, storedWalletName) : undefined;

    const { signature, signaturePublicKey, message } = loadStoredSignatureAndMessage();

    this.connection = connection;
    this.autoConnect = autoConnect;
    this.network = network;
    this.wallets = wallets;
    this.wallet = wallet;
    this.signature = signature;
    this.signaturePublicKey = signaturePublicKey ? new PublicKey(signaturePublicKey) : undefined;
    this.signatureMessage = message;
    this.mintToken = actions.CreateMintToken(api, this);

    // We use event listeners to sync the state of the wallet with the context so that external
    // consumers don't have to worry about calling the methods directly.
    setupEventListeners(this);
    this.wallets.forEach((w) => setupWalletListeners(w, onError));
  }

  get = <N extends keyof this, I extends this[N]>(name: N): I => this[name] as I;

  set = <N extends keyof this>(name: N, item: this[N]) => {
    this[name] = item as this[N];
    // We emit an event when a property is set so that external consumers can listen for changes
    // (eg: react SDK can listen and update state).
    this.emit('axyzSolanaChange');
  };

  setMany = <N extends keyof this>(values: Record<N, this[N]>) => {
    const keys = Object.keys(values);
    keys.forEach((key) => {
      this[key as N] = values[key as N] as this[N];
    });

    this.emit('axyzSolanaChange');
  };
}

export default AxyzSolanaContext;
