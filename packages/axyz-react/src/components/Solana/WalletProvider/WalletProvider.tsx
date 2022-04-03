import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useMemo } from 'react';

import { useAxyz } from '../../../hooks';

import { WalletContext } from '../../../hooks/solana/useWallet';
import useConnectionListeners from './useConnectionListeners';
import useAxyzWalletState from './useAxyzWalletState';
import useWaitForAutoConnect from '../../../hooks/useWaitForAutoConnect';

export interface Props {
  autoConnect?: boolean;
}

const WalletProvider: FC<Props> = ({ children, autoConnect }) => {
  const axyz = useAxyz();

  const { connecting, disconnect, connect, select, disconnecting } = useWallet();

  useConnectionListeners(axyz);

  const state = useAxyzWalletState(axyz);

  const waitingForAutoConnect = useWaitForAutoConnect(state.connected, !!autoConnect);

  const contextValue = useMemo(
    () => ({
      wallet: state.wallet,
      connected: state.connected,
      connecting,
      disconnecting,
      disconnect,
      connect,
      select,
      // On the first render we want it to be loading, this will give auto connect a chance to work
      loading: connecting || disconnecting || waitingForAutoConnect,
    }),
    [state, connecting, disconnecting, disconnect, connect, select, waitingForAutoConnect]
  );

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
