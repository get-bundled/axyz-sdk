import React, { FC, useState, useMemo, useCallback } from 'react';
import { Button, Grid, Modal, Text } from '@nextui-org/react';

import { useWallet } from '../../hooks';
import WalletConnectButton from '../WalletConnectButton';
import useModal from '../../hooks/useModal';

interface Props {}

const ModalConnect: FC<Props> = () => {
  const { bindings, setVisible } = useModal();
  const { installedWallets, loadableWallets, undetectedWallets } = useWallet();

  const [showMore, setShowMore] = useState(false);

  const readyWallets = useMemo(
    () => installedWallets.concat(loadableWallets),
    [installedWallets, loadableWallets]
  );

  const close = useCallback(() => setVisible(false), [setVisible]);

  return (
    <div className="axyz-modal-connect">
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={bindings.open}
        onClose={bindings.onClose}
      >
        <Modal.Header>
          <Text
            h1
            weight="bold"
            css={{
              ml: '$2',
              textGradient: '45deg, $purple500 -20%, $pink500 100%',
            }}
            size={32}
          >
            Connect your Wallet
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container
            css={{ height: 350, overflowY: 'scroll' }}
            gap={2}
            alignItems="center"
            justify="center"
          >
            {readyWallets.map((wallet) => (
              <Grid key={wallet.name} xs={12} justify="center">
                <WalletConnectButton wallet={wallet} close={close} />
              </Grid>
            ))}
            {showMore &&
              undetectedWallets.map((wallet) => (
                <Grid key={wallet.name} xs={12} justify="center">
                  <WalletConnectButton wallet={wallet} close={close} />
                </Grid>
              ))}
            <Grid xs={12} justify="center">
              <Button
                css={{
                  backgroundColor: '$gray400',
                  '&:hover': {
                    backgroundColor: '$gray500',
                  },
                }}
                size="lg"
                onClick={() => setShowMore(!showMore)}
              >
                Show {showMore ? 'Less' : 'More'} Options
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConnect;
