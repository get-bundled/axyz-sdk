import { Connector, InjectedConnector } from 'wagmi-core';

export type ChainName = 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan';
export type Address = string;

export type EthereumWallet = Connector | InjectedConnector;
export type EthereumWallets = EthereumWallet[];

type Callback = (() => void) | (() => Promise<void>);

export interface AxyzEthereumEvents {
  connect(wallet: EthereumWallet, callback?: Callback): void;
  disconnect(callback?: Callback): void;
  axyzEthereumChange(): void;
}
