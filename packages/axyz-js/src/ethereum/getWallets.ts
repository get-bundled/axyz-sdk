import { Chain } from 'wagmi-core';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

import type { EthereumWallet } from '../types/ethereum';

const getWallets = (chains: Chain[], darkMode?: boolean): EthereumWallet[] => [
  new InjectedConnector({
    chains,
    options: {
      shimDisconnect: true,
    },
  }),
  new WalletConnectConnector({
    chains,
    options: { qrcode: true },
  }),
  new WalletLinkConnector({
    chains,
    options: {
      appName: 'Get Axyz',
      darkMode,
    },
  }),
];

export default getWallets;
