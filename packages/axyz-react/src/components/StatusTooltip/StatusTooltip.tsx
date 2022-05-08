import type { EthereumWallet, SolanaWallet } from '@axyzsdk/js';
import { styled } from '@nextui-org/react';
import React from 'react';

import WalletStatusControl from '../WalletStatusControl';

import getWalletIcon from '../../utils/ethereum/getWalletIcon';

import * as styles from './styles';

interface Props {
  ethereumWallet?: EthereumWallet | null;
  ethereumAddress?: string | null;
  ethereumName?: string | null;
  ethereumAvatar?: string | null;
  solanaWallet?: SolanaWallet | null;
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

const StatusTooltip: React.FC<Props> = ({
  ethereumWallet,
  ethereumAddress,
  ethereumName,
  ethereumAvatar,
  solanaWallet,
  ethereumConnected,
  solanaConnected,
  ethereumLoading,
  ethereumError,
  solanaLoading,
  ethereumDisconnect,
  solanaDisconnect,
}) => {
  const iconSize = 40;
  const ETHWalletIcon = getWalletIcon(ethereumWallet, ethereumName, ethereumAvatar, iconSize);

  return (
    <FlexColumn
      css={{
        width: 323,
        height: 238,
        position: 'relative',
      }}
    >
      <WalletStatusControl
        chain="ETH"
        address={ethereumAddress || undefined}
        walletIcon={ETHWalletIcon}
        name={ethereumName || ethereumWallet?.name || 'Ethereum'}
        connected={ethereumConnected}
        loading={ethereumLoading}
        error={!!ethereumError}
        disconnect={ethereumDisconnect}
        border
      />
      <WalletStatusControl
        chain="SOL"
        walletIcon={
          solanaWallet ? (
            <SolanaWalletIcon
              css={{ width: `${iconSize}px`, height: `${iconSize}px` }}
              alt={solanaWallet?.name}
              src={solanaWallet?.icon}
            />
          ) : undefined
        }
        address={solanaWallet?.publicKey?.toString()}
        name={solanaWallet?.name || 'Solana'}
        connected={solanaConnected}
        loading={solanaLoading}
        disconnect={solanaDisconnect}
      />
    </FlexColumn>
  );
};

export default StatusTooltip;
