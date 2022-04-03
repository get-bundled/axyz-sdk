import solanaWeb3 from '@solana/web3.js';
import { AxiosInstance } from 'axios';

import type { EntitlementKeys, ErrorCallback } from '../types';
import type { ChainName } from '../types/ethereum';
import AxyzEthereumContext from '../ethereum/context';
import AxyzSolanaContext from '../solana/context';

export interface AxyzContextArguments {
  apiKey: string;
  api: AxiosInstance;
  environment: 'local' | 'development' | 'production';
  onError?: ErrorCallback;

  // ETHEREUM
  ethereumChain: ChainName;
  ethereumAutoConnect?: boolean;

  // SOLANA
  solanaConnection: solanaWeb3.Connection;
  solanaNetwork: solanaWeb3.Cluster;
  solanaAutoConnect?: boolean;
}

export interface AxyzContext extends AxyzContextArguments {
  entitlements?: EntitlementKeys;
  solana: AxyzSolanaContext;
  ethereum: AxyzEthereumContext;
}

class Context {
  context: AxyzContext;

  ethereum: AxyzEthereumContext;

  getEthereum: AxyzEthereumContext['get'];

  setEthereum: AxyzEthereumContext['set'];

  solana: AxyzSolanaContext;

  getSolana: AxyzSolanaContext['get'];

  setSolana: AxyzSolanaContext['set'];

  constructor(args: AxyzContextArguments) {
    this.context = {
      ...args,
      ethereum: new AxyzEthereumContext({ chain: args.ethereumChain, onError: args.onError }),
      solana: new AxyzSolanaContext({
        api: args.api,
        network: args.solanaNetwork,
        connection: args.solanaConnection,
        autoConnect: args.solanaAutoConnect,
        onError: args.onError,
      }),
    };

    this.ethereum = this.context.ethereum;
    this.getEthereum = this.context.ethereum.get;
    this.setEthereum = this.context.ethereum.set;

    this.solana = this.context.solana;
    this.getSolana = this.context.solana.get;
    this.setSolana = this.context.solana.set;
  }

  get = <N extends keyof AxyzContext, I extends AxyzContext[N]>(name: N): I =>
    this.context[name] as I;

  getAll = () => this.context;

  set = <N extends keyof AxyzContext>(name: N, item: AxyzContext[N]) => {
    this.context[name] = item as AxyzContext[N];
  };
}

export default Context;
