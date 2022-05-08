import React from 'react';
import { Image } from '@nextui-org/react';
import { EthereumWallet } from '@axyzsdk/js';

import MetamaskIcon from '../../logos/Metamask';
import CoinbaseIcon from '../../logos/Coinbase';
import WalletConnectIcon from '../../logos/Walletconnect';

const getWalletIcon = (
  wallet?: EthereumWallet | null,
  name?: string | null,
  avatar?: string | null,
  iconSize: number | string = 24
): JSX.Element | undefined => {
  if (!wallet) {
    return undefined;
  }

  if (avatar) {
    return (
      <Image
        css={{ borderRadius: '100%' }}
        showSkeleton
        src={avatar}
        alt={name || 'ENS Avatar'}
        width={iconSize}
        height={iconSize}
        objectFit="contain"
      />
    );
  }

  const walletName = wallet.name.toLowerCase();
  if (walletName === 'metamask') {
    return <MetamaskIcon width={iconSize} height={iconSize} />;
  }
  if (walletName === 'coinbase wallet') {
    return <CoinbaseIcon width={iconSize} height={iconSize} />;
  }
  if (walletName === 'walletconnect') {
    return <WalletConnectIcon width={iconSize} height={iconSize} />;
  }

  return undefined;
};

export default getWalletIcon;
