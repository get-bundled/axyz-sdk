import { useModal as useNextModal } from '@nextui-org/react';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

import { useWallet as useEthereumWallet } from '../../hooks/ethereum/useWallet';

import { ModalContext } from '../../hooks/useModal';

export interface Props {
  startOpen?: boolean;
}

const ModalProvider: FC<Props> = ({ children, startOpen = false }) => {
  const { visible, setVisible, bindings } = useNextModal(startOpen);

  const { connected: solanaConnected } = useSolanaWallet();
  const { connected: ethereumConnected } = useEthereumWallet();

  const [showETHWallets, setShowETHWallets] = useState(!ethereumConnected);
  const [showSOLWallets, setShowSOLWallets] = useState(!solanaConnected);

  const openModal = useCallback(
    (chain?: 'ETH' | 'SOL') => {
      if (chain === 'ETH') {
        setShowETHWallets(true);
        setShowSOLWallets(false);
      }
      if (chain === 'SOL') {
        setShowSOLWallets(true);
        setShowETHWallets(false);
      }
      setVisible(true);
    },
    [setVisible]
  );

  const context = useMemo(
    () => ({
      visible,
      openModal,
      bindings,
      setVisible,
      showETHWallets,
      showSOLWallets,
      setShowETHWallets,
      setShowSOLWallets,
    }),
    [
      bindings,
      visible,
      openModal,
      setVisible,
      setShowSOLWallets,
      setShowETHWallets,
      showSOLWallets,
      showETHWallets,
    ]
  );

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
