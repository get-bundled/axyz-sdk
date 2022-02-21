import { Button, CSS, NormalColors, styled, Tooltip } from '@nextui-org/react';
import React, { useCallback } from 'react';
import { IoWalletOutline } from 'react-icons/io5';
import useWallet from '../../hooks/useWallet';
import useModal from '../../hooks/useModal';
import WalletStatusTooltip from '../WalletStatusTooltip';

interface Props {
  css?: CSS;
}

const Box = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const WalletIcon = styled(IoWalletOutline, {
  width: '$12',
  height: '$12',
});

const WalletStatus: React.FC<Props> = ({ css }) => {
  const { setVisible } = useModal();
  const { connected, connecting, disconnecting } = useWallet();

  let color: NormalColors = 'success';

  if (connecting || disconnecting) {
    color = 'warning';
  }
  if (!connected) {
    color = 'error';
  }

  const handleClick = useCallback(() => setVisible(true), [setVisible]);

  if (connected) {
    return (
      <Box css={css} className="axyz-wallet-status">
        <Tooltip
          hideArrow
          content={<WalletStatusTooltip />}
          color="invert"
          rounded
          placement="bottomEnd"
        >
          <Button
            clickable={false}
            auto
            css={{ px: '$10' }}
            color={color}
            ghost
            icon={<WalletIcon fill="currentColor" />}
          />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box css={css} className="axyz-wallet-status">
      <Button
        auto
        css={{ px: '$10' }}
        onClick={handleClick}
        color={color}
        ghost
        icon={<WalletIcon fill="currentColor" />}
      />
    </Box>
  );
};

export default WalletStatus;
