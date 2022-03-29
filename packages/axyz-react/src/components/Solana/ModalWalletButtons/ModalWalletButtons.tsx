import React, { FC } from 'react';
import { Grid, styled } from '@nextui-org/react';

import WalletConnectButton from '../../WalletConnectButton';
import { useAxyz } from '../../../hooks';
import { useWallet } from '../../../hooks/solana/useWallet';

interface Props {
  close: () => void;
}

const Image = styled('img', {
  width: '$10',
  height: '$10',
});

const ModalWalletButtons: FC<Props> = ({ close }) => {
  const { installedWallets, loadableWallets, undetectedWallets, connect } = useWallet();
  const axyz = useAxyz();

  return (
    <>
      {[...installedWallets, ...loadableWallets, ...undetectedWallets].map((wallet) => (
        <Grid key={wallet.name} xs={12} justify="center">
          <WalletConnectButton
            Icon={wallet.icon ? <Image alt={wallet.name} src={wallet.icon} /> : undefined}
            onClick={async () => {
              await connect(wallet);
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
