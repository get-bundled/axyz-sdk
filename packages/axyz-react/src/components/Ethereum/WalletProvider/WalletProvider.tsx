import React, { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';

import { useAxyz } from '../../../hooks';
import { WalletContext } from '../../../hooks/ethereum/useWallet';
import useAxyzWalletState from './useAxyzWalletState';
import useConnectionListeners from './useConnectionListeners';

interface Props {}

const WalletProvider: React.FC<Props> = ({ children }) => {
  const axyz = useAxyz();

  useConnectionListeners(axyz);
  const state = useAxyzWalletState(axyz);

  const [{ loading, error, data: accountData }, disconnect] = useAccount();

  const doDisconnect = useCallback(async () => {
    await disconnect();
    if (state.wallet?.options.shimDisconnect) {
      state.wallet.emit('disconnect');
    }
  }, [state, disconnect]);

  const contextValue = useMemo(
    () => ({
      wallet: state.wallet,
      connected: state.connected,
      disconnect: doDisconnect,
      loading,
      error,
      ens: accountData?.ens,
      address: accountData?.address,
    }),
    [accountData, state, doDisconnect, error, loading]
  );

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
