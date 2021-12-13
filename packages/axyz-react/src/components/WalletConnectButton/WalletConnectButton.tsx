/* eslint-disable no-nested-ternary */
import { Button, Loading, styled, Text } from '@nextui-org/react';
import { WalletError } from '@solana/wallet-adapter-base';
import React, { useCallback } from 'react';
import { useWallet } from '../..';
import { Wallet } from '../../types/wallet';

interface Props {
  wallet: Wallet;
  close: () => void;
}

const Image = styled('img', {
  width: '$10',
  height: '$10',
});

const WalletConnectButton = ({ wallet, close }: Props) => {
  const { connect, connected } = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const doConnect = useCallback(async () => {
    try {
      setLoading(true);
      await connect(wallet);
    } catch (err) {
      const e = err as WalletError;
      setError(e.message);
    } finally {
      setLoading(false);
      setSuccess(true);
      close();
    }
  }, [connect, wallet, close]);

  return (
    <Button
      icon={wallet.icon && <Image alt={wallet.name} src={wallet.icon} />}
      size="lg"
      ghost={connected || !!error ? undefined : true}
      color={success ? 'success' : error ? 'error' : 'gradient'}
      clickable={!loading && !error}
      onClick={doConnect}
    >
      {loading ? (
        <Loading type="points-opacity" color="white" size="lg" />
      ) : (
        <Text weight="bold" size={18}>
          {wallet.name}
        </Text>
      )}
    </Button>
  );
};

export default WalletConnectButton;
