import React, { FC, useCallback, useEffect } from 'react';
import { Button, Modal, styled, Text, Grid, CSS } from '@nextui-org/react';

import useModal from '../../hooks/useModal';
import SolanaModalWalletButtons from '../Solana/ModalWalletButtons';
import EthereumModalWalletButtons from '../Ethereum/ModalWalletButtons';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useEthereumWallet } from '../../hooks/ethereum/useWallet';

interface Props {
  width?: string;
  onError?: (error: Error) => void;
  css?: CSS;
}

const Stack = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$4',
  my: '$4',
});

const ModalConnect: FC<Props> = ({ width = '500px', onError, css }) => {
  const {
    bindings,
    setVisible,
    visible,
    setShowETHWallets,
    setShowSOLWallets,
    showETHWallets,
    showSOLWallets,
  } = useModal();

  const { connected: solanaConnected } = useSolanaWallet();
  const { connected: ethereumConnected } = useEthereumWallet();

  useEffect(() => {
    if (solanaConnected && !visible) {
      setShowSOLWallets(false);
      setShowETHWallets(true);
    }
    if (ethereumConnected && !visible) {
      setShowETHWallets(false);
      setShowSOLWallets(true);
    }
  }, [solanaConnected, ethereumConnected, visible, setShowSOLWallets, setShowETHWallets]);

  const close = useCallback(() => setVisible(false), [setVisible]);

  return (
    <div className="axyz-modal-connect">
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={bindings.open}
        onClose={bindings.onClose}
        width={width}
        css={css}
      >
        <Modal.Header css={{ flexDirection: 'column' }}>
          <Text
            h1
            weight="bold"
            css={{
              textGradient: '45deg, $purple500 -20%, $pink500 100%',
            }}
            size={28}
          >
            Connect your wallet
          </Text>
          <Stack>
            {!solanaConnected && (
              <Button
                size="sm"
                rounded
                color={showSOLWallets ? 'success' : 'error'}
                bordered={!showSOLWallets}
                shadow
                css={{ mx: '$2' }}
                onClick={() => {
                  setShowSOLWallets(true);
                  setShowETHWallets(false);
                }}
              >
                Solana
              </Button>
            )}
            {!ethereumConnected && (
              <Button
                size="sm"
                rounded
                color={showETHWallets ? 'success' : 'error'}
                bordered={!showETHWallets}
                shadow
                css={{ mx: '$2' }}
                onClick={() => {
                  setShowETHWallets(true);
                  setShowSOLWallets(false);
                }}
              >
                Ethereum
              </Button>
            )}
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container
            css={{
              height: 300,
              overflowY: 'auto',
              my: '$2',
              py: '$2',
            }}
            gap={1}
            alignItems="center"
            justify="center"
            alignContent="flex-start"
          >
            {showSOLWallets && <SolanaModalWalletButtons close={close} />}
            {showETHWallets && <EthereumModalWalletButtons close={close} onError={onError} />}
            {!showETHWallets && !showSOLWallets && <Text>No wallets available</Text>}
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
