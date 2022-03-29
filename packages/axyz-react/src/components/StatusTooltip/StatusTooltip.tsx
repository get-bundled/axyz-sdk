import type { EthereumWallet, SolanaWallet } from '@axyzsdk/js';
import { styled } from '@nextui-org/react';
import React from 'react';

import WalletPill from '../WalletPill';

import getWalletIcon from '../../utils/ethereum/getWalletIcon';
import Ethereum from '../../logos/Ethereum';
import Solana from '../../logos/Solana';

import * as styles from './styles';

interface Props {
  ethereumWallet?: EthereumWallet;
  solanaWallet?: SolanaWallet;
  ethereumConnected: boolean;
  solanaConnected: boolean;
  ethereumLoading: boolean;
  solanaLoading: boolean;
  ethereumError?: Error;
  ethereumDisconnect?: () => void;
  solanaDisconnect?: SolanaWallet['disconnect'];
}

const FlexColumn = styled('div', styles.FlexColumn);
const SolanaWalletIcon = styled('img', {});
const EthereumLogo = styled(Ethereum, styles.EthereumLogo);
const SolanaLogo = styled(Solana, styles.SolanaLogo);

const StatusTooltip: React.FC<Props> = ({
  ethereumWallet,
  solanaWallet,
  ethereumConnected,
  solanaConnected,
  ethereumLoading,
  ethereumError,
  solanaLoading,
  ethereumDisconnect,
  solanaDisconnect,
}) => {
  const iconSize = 30;
  const ETHWalletIcon = getWalletIcon(ethereumWallet, iconSize);

  return (
    <FlexColumn>
      <WalletPill
        icon={ETHWalletIcon || <EthereumLogo width={iconSize} height={iconSize} />}
        name={ethereumWallet?.name || 'Ethereum'}
        connected={ethereumConnected}
        loading={ethereumLoading}
        error={!!ethereumError}
        disconnect={ethereumDisconnect}
      />
      <WalletPill
        icon={
          solanaWallet ? (
            <SolanaWalletIcon
              css={{ width: `${iconSize}px`, height: `${iconSize}px` }}
              alt={solanaWallet?.name}
              src={solanaWallet?.icon}
            />
          ) : (
            <SolanaLogo width={iconSize} height={iconSize} />
          )
        }
        name={solanaWallet?.name || 'Solana'}
        connected={solanaConnected}
        loading={solanaLoading}
        disconnect={solanaDisconnect}
      />
    </FlexColumn>
  );
};

export default StatusTooltip;
