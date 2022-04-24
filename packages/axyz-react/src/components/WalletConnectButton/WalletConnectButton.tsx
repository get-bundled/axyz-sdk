/* eslint-disable no-nested-ternary */
import { Button, Loading, Text } from '@nextui-org/react';
import { WalletError } from '@solana/wallet-adapter-base';
import React, { useCallback, useState } from 'react';

interface Props {
  onClick: (() => Promise<void>) | (() => void);
  close: () => void;
  disabled?: boolean;
  Icon?: JSX.Element;
  name: string;
  connected?: boolean;
}

const WalletConnectButton = ({ onClick, disabled, Icon, connected, name, close }: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const click = useCallback(async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (err) {
      const e = err as WalletError;
      setError(e.message);
    } finally {
      setLoading(false);
      setSuccess(true);

      close();
    }
  }, [onClick, close]);

  return (
    <Button
      icon={Icon}
      size="xl"
      disabled={disabled || loading || connected}
      ghost={!error}
      color={success || connected ? 'success' : error ? 'error' : 'gradient'}
      onClick={click}
    >
      {loading ? (
        <Loading type="points-opacity" color="white" size="lg" />
      ) : (
        <Text weight="bold" size={18}>
          {name}
        </Text>
      )}
    </Button>
  );
};

export default WalletConnectButton;
