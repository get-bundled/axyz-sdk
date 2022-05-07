import { Button, CSS, NormalColors, styled, Tooltip, Image } from '@nextui-org/react';
import React from 'react';
import { IoWalletOutline } from 'react-icons/io5';

import { useWallet as useSolanaWallet } from '../../hooks/solana/useWallet';
import { useWallet as useEthereumWallet } from '../../hooks/ethereum/useWallet';

import * as styles from './styles';
import StatusTooltip from '../StatusTooltip';

interface Props {
  css?: CSS;
}

const Box = styled('div', styles.Box);
const WalletIcon = styled(IoWalletOutline, styles.WalletIcon);

const WalletStatus: React.FC<Props> = ({ css }) => {
  const {
    connected: solanaConnected,
    connecting: solanaConnecting,
    disconnecting: solanaDisconnecting,
    wallet: solanaWallet,
    disconnect: solanaDisconnect,
  } = useSolanaWallet();
  const {
    wallet: ethereumWallet,
    connected: ethereumConnected,
    error: ethereumError,
    loading: ethereumLoading,
    disconnect: ethereumDisconnect,
    address: ethereumAddress,
    ens: ethereumEns,
  } = useEthereumWallet();

  let color: NormalColors = 'success';

  if ((!solanaConnected && !ethereumConnected) || ethereumError) {
    color = 'error';
  }

  if (solanaConnecting || solanaDisconnecting || ethereumLoading) {
    color = 'warning';
  }

  return (
    <Box css={css} className="axyz-wallet-status">
      <Tooltip
        trigger="click"
        hideArrow
        keepMounted
        content={
          <StatusTooltip
            ethereumAddress={ethereumAddress}
            ethereumName={ethereumEns?.name}
            ethereumAvatar={ethereumEns?.avatar}
            ethereumWallet={ethereumWallet}
            solanaWallet={solanaWallet}
            ethereumLoading={ethereumLoading}
            solanaLoading={solanaConnecting || solanaDisconnecting}
            ethereumConnected={ethereumConnected}
            solanaConnected={solanaConnected}
            ethereumError={ethereumError}
            ethereumDisconnect={ethereumDisconnect}
            solanaDisconnect={solanaDisconnect}
          />
        }
        css={{ padding: 0, backgroundColor: '$background', width: 323, height: 238 }}
        rounded
        placement="bottomEnd"
      >
        <Button
          auto
          css={{ px: 0, width: 48, height: 48, borderRadius: '100%' }}
          color={color}
          ghost
          icon={!ethereumEns?.avatar && <WalletIcon fill="currentColor" />}
        >
          {ethereumEns?.avatar && (
            <Image
              showSkeleton
              src={ethereumEns.avatar}
              alt={ethereumEns.name}
              objectFit="contain"
              width="100%"
              height="100%"
            />
          )}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default WalletStatus;
