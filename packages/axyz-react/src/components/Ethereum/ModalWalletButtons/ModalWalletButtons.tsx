import React, { FC, useCallback, useEffect } from 'react';
import { Grid, useTheme } from '@nextui-org/react';
import { EthereumWallet } from '@axyzsdk/js';
import { useConnect } from 'wagmi';

import WalletConnectButton from '../../WalletConnectButton';
import { useAxyz } from '../../../hooks';
import getWalletIcon from '../../../utils/ethereum/getWalletIcon';

interface Props {
  close: () => void;
  onError?: (error: Error) => void;
}

const ModalWalletButtons: FC<Props> = ({ close, onError }) => {
  const { theme } = useTheme();
  const iconSize = theme?.space['10'].value!;

  const axyz = useAxyz();

  const [{ data, error }, connect] = useConnect();
  const onClick = useCallback(async (wallet: EthereumWallet) => connect(wallet), [connect]);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  return (
    <>
      {data.connectors.map((wallet) => {
        const icon = getWalletIcon(wallet, iconSize);

        return (
          <Grid key={wallet.name} xs={12} justify="center">
            <WalletConnectButton
              Icon={icon}
              onClick={() => onClick(wallet)}
              name={wallet.name}
              disabled={axyz.ethereum.isConnected}
              close={close}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default ModalWalletButtons;
