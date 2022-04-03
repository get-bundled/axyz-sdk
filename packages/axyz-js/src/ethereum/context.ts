import EthereumEvents from './events';
import { getSupportedChain } from './chains';
import getWallets from './getWallets';
import setupWalletListeners from './setupWalletListeners';
import setupEventListeners from './setupEventListeners';
import { loadStoredSignatureAndMessage } from './signature';
import type { Address, EthereumWallet, EthereumWallets, ChainName } from '../types/ethereum';
import type { ErrorCallback } from '../types';

interface AxyzEthereumContextArgs {
  chain: ChainName;
  onError?: ErrorCallback;
}

class AxyzEthereumContext extends EthereumEvents {
  address?: Address | null;

  isConnected?: boolean;

  isConnecting?: boolean;

  isDiconnecting?: boolean;

  wallet?: EthereumWallet | null;

  wallets: EthereumWallets;

  signature?: string;

  signatureAddress?: Address;

  signatureMessage?: string;

  constructor({ chain, onError }: AxyzEthereumContextArgs) {
    super();

    this.wallets = getWallets(getSupportedChain(chain));

    const { signature, signatureAddress, message } = loadStoredSignatureAndMessage();

    this.signature = signature;
    this.signatureAddress = signatureAddress;
    this.signatureMessage = message;

    // We use event listeners to sync the state of the wallet with the context so that external
    // consumers don't have to worry about calling the methods directly.
    setupEventListeners(this);
    this.wallets.forEach((wallet) => setupWalletListeners(wallet, this, onError));
  }

  get = <N extends keyof this, I extends this[N]>(name: N): I => this[name] as I;

  set = <N extends keyof this>(name: N, item: this[N]) => {
    this[name] = item as this[N];
    // We emit an event when a property is set so that external consumers can listen for changes
    // (eg: react SDK can listen and update state).
    this.emit('axyzEthereumChange');
  };

  setMany = <N extends keyof this>(values: Record<N, this[N]>) => {
    const keys = Object.keys(values);
    keys.forEach((key) => {
      this[key as N] = values[key as N] as this[N];
    });

    this.emit('axyzEthereumChange');
  };
}

export default AxyzEthereumContext;
