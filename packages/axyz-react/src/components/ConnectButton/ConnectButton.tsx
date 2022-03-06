import { Button, CSS, styled, Text } from '@nextui-org/react';
import { IoWalletOutline } from 'react-icons/io5';
import React, { useCallback } from 'react';
import { useWallet } from '../..';
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
  const { disconnect, connected } = useWallet();

  const handleClick = useCallback(() => {
    onClick?.();
    setVisible(true);
  }, [onClick, setVisible]);

  if (connected && hideAfterConnect) {
    return null;
  }

  if (connected) {
    return (
      <Button css={css} color="error" onClick={disconnect} size="md" rounded animated>
        <Text weight="bold" transform="uppercase">
          Disconnect
        </Text>{' '}
      </Button>
    );
  }

  return (
    <Button
      css={css}
      onClick={handleClick}
      shadow
      ghost
      color="gradient"
      size="md"
      rounded
      animated
    >
      <Text color="currentColor" weight="bold" transform="uppercase">
        Connect
      </Text>{' '}
      <WalletIcon />
    </Button>
  );
};

export default ConnectButton;
