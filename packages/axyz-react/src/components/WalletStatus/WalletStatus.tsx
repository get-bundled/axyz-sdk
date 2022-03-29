import { Button, CSS, NormalColors, styled, Tooltip } from '@nextui-org/react';
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
        css={{ backgroundColor: '$accents3' }}
        rounded
        placement="bottomEnd"
      >
        <Button
          auto
          css={{ px: '$10' }}
          color={color}
          ghost
          icon={<WalletIcon fill="currentColor" />}
        />
      </Tooltip>
    </Box>
  );
};

export default WalletStatus;
