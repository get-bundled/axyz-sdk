import React, { FC } from 'react';
import { Grid, Image } from '@nextui-org/react';

import WalletConnectButton from '../../WalletConnectButton';
import { useAxyz, useSortedWallets } from '../../../hooks';
import { useWallet } from '../../../hooks/solana/useWallet';

interface Props {
  close: () => void;
}

const ModalWalletButtons: FC<Props> = ({ close }) => {
  const { installedWallets, loadableWallets, undetectedWallets } = useSortedWallets();
  const { select } = useWallet();

  const axyz = useAxyz();

  return (
    <>
      {[...installedWallets, ...loadableWallets, ...undetectedWallets].map((wallet) => (
        <Grid key={wallet.name} xs={12} justify="center">
          <WalletConnectButton
            Icon={
              wallet.icon ? (
                <Image showSkeleton width="$10" height="$10" alt={wallet.name} src={wallet.icon} />
              ) : undefined
            }
            onClick={async () => {
              select(wallet.name);

              await wallet.connect();
            }}
            disabled={axyz.solana.isConnected}
            name={wallet.name}
            close={close}
          />
        </Grid>
      ))}
    </>
  );
};

export default ModalWalletButtons;
