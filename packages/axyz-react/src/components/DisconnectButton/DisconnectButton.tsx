import { Button } from '@nextui-org/react';
import React from 'react';
import useWallet from '../../hooks/useWallet';

const DisconnectButton = () => {
  const { disconnect } = useWallet();

  return (
    <Button onClick={disconnect} ghost color="error" rounded>
      Disconnect
    </Button>
  );
};

export default DisconnectButton;
