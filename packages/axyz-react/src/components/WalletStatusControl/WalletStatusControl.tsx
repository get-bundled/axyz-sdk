import React, { useCallback, useState } from 'react';
import { Button, styled, Text } from '@nextui-org/react';
import useModal from '../../hooks/useModal';
import EthLogo from './EthLogo';
import SolLogo from './SolLogo';
import { Box } from '../Blocks';
import WalletInfo from '../WalletInfo';
import WalletDisconnectOverlay from './WalletDisconnectOverlay';

type Chain = 'ETH' | 'SOL';

const logoMapping = {
  ETH: EthLogo,
  SOL: SolLogo,
};

const FlexRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Root = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '20px 20px 0 20px',
  height: '50%',
  variants: {
    border: {
      none: {},
      border: { borderBottom: '1px solid $accents2' },
    },
  },

  defaultVariants: {
    border: 'none',
  },
});

const StatusCircle = styled('div', {
  width: '8px',
  height: '8px',
  borderRadius: '100%',
  variants: {
    fill: {
      connected: {
        backgroundColor: '$success',
        border: '1px solid $success',
      },
      disconnected: {
        backgroundColor: 'transparent',
        border: '1px solid #9FB2DE',
      },
      loading: {
        backgroundColor: '$warning',
        border: '1px solid $warning',
      },
    },
  },
});

interface Props {
  walletIcon?: JSX.Element;
  address?: string;
  name?: string;
  chain: Chain;
  connected: boolean;
  error?: boolean;
  loading: boolean;
  border?: boolean;
  disconnect?: () => void | Promise<void>;
}

const WalletStatusControl: React.FC<Props> = ({
  chain,
  connected,
  loading,
  error,
  disconnect,
  address,
  name,
  walletIcon,
  border,
}) => {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const { openModal } = useModal();

  let fill = 'disconnected';
  if (connected) {
    fill = 'connected';
  }
  if (loading) {
    fill = 'loading';
  }
  if (error) {
    fill = 'disconnected';
  }

  const Icon = logoMapping[chain];
  const doDisconnect = useCallback(async () => {
    await disconnect?.();
    return setShowDisconnect(false);
  }, [disconnect]);

  return (
    <Root border={border ? 'border' : 'none'}>
      <FlexRow css={{ width: '100%' }}>
        <Box css={{ display: 'flex' }}>
          <Icon styles={{ marginRight: '4px' }} />
          <Text h1 css={{ fontSize: 12, lineHeight: '16px', fontWeight: 600, color: '#9FB2DE' }}>
            {chain}
          </Text>
        </Box>
        <StatusCircle fill={fill as 'connected' | 'disconnected' | 'loading'} />
      </FlexRow>
      <Box css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {connected ? (
          <WalletInfo
            address={address!}
            name={name!}
            setDisconnect={() => setShowDisconnect(true)}
            Icon={walletIcon!}
          />
        ) : (
          <Button
            rounded
            css={{
              width: 137,
              height: 28,
              background: 'transparent',
              marginTop: '24px',
              color: '#4364AF',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '12px',
              border: '1px solid #ECF0F8',
            }}
            onClick={() => openModal(chain)}
          >
            Connect {chain} Wallet
          </Button>
        )}
      </Box>
      {showDisconnect && (
        <WalletDisconnectOverlay
          cancel={() => setShowDisconnect(false)}
          disconnect={doDisconnect}
        />
      )}
    </Root>
  );
};

export default WalletStatusControl;
