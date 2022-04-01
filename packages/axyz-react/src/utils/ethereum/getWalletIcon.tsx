import React from 'react';
import { EthereumWallet } from '@axyzsdk/js';

import MetamaskIcon from '../../logos/Metamask';
import CoinbaseIcon from '../../logos/Coinbase';
import WalletConnectIcon from '../../logos/Walletconnect';

const getWalletIcon = (
  wallet?: EthereumWallet | null,
  iconSize: number | string = 24
): JSX.Element | undefined => {
  if (!wallet) {
    return undefined;
  }
  const name = wallet.name.toLowerCase();
  if (name === 'metamask') {
    return <MetamaskIcon width={iconSize} height={iconSize} />;
  }
  if (name === 'coinbase wallet') {
    return <CoinbaseIcon width={iconSize} height={iconSize} />;
  }
  if (name === 'walletconnect') {
    return <WalletConnectIcon width={iconSize} height={iconSize} />;
  }

  return undefined;
};

export default getWalletIcon;
