import React from 'react';
import { styled } from '@nextui-org/react';

import DisconnectButton from '../DisconnectButton';

const Box = styled('div', {
  display: 'flex',
  px: '$8',
  py: '$4',
  justifyContent: 'center',
  alignItems: 'center',
});

const WalletStatusTooltip = () => (
  <Box>
    <DisconnectButton />
  </Box>
);

export default WalletStatusTooltip;
