import { Button, CSS, styled, Text } from '@nextui-org/react';
import { IoWalletOutline } from 'react-icons/io5';
import React, { useCallback } from 'react';
import { useWallet as useSolanaWallet } from '../../hooks/solana';
import { useWallet as useEthereumWallet } from '../../hooks/ethereum';
import useModal from '../../hooks/useModal';

interface Props {
  onClick?: () => void;
  hideAfterConnect?: boolean;
  css?: CSS;
}

const WalletIcon = styled(IoWalletOutline, {
  ml: '$4',
});

const ConnectButton: React.FC<Props> = ({ onClick, hideAfterConnect, css }) => {
  const { setVisible } = useModal();
  const { connected: solanaConnected } = useSolanaWallet();
  const { connected: ethereumConnected } = useEthereumWallet();

  const handleClick = useCallback(() => {
    onClick?.();
    setVisible(true);
  }, [onClick, setVisible]);

  const connected = solanaConnected && ethereumConnected;

  if (connected && hideAfterConnect) {
    return null;
  }

  return (
    <Button
      css={css}
      onClick={handleClick}
      clickable={!connected}
      shadow
      ghost
      color={connected ? 'success' : 'gradient'}
      size="md"
      rounded
      animated
    >
      <Text color="currentColor" weight="bold" transform="uppercase">
        {connected ? 'Connected' : 'Connect'}
      </Text>{' '}
      <WalletIcon />
    </Button>
  );
};

export default ConnectButton;
