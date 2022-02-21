import { Adapter, WalletError, WalletReadyState } from '@solana/wallet-adapter-base';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { WalletContext } from '../../hooks/useWallet';
import { useAxyz } from '../../hooks';
import useSortedWallets from '../../hooks/useSortedWallets';
import useAutoConnect from '../../hooks/useAutoConnect';
import useUnloading from '../../hooks/useUnloading';
import useWalletEventListeners from './useWalletEventListeners';
import handleUnavailableWallet from '../../utils/handleUnavailableWallet';
import { Wallet } from '../../types/wallet';

export interface Props {
  onError?: (error: WalletError) => void;
  autoConnect?: boolean;
}

const WalletProvider: FC<Props> = ({ children, onError, autoConnect }) => {
  const axyz = useAxyz();

  const { installedWallets, loadableWallets, undetectedWallets } = useSortedWallets();

  const [wallet, setWallet] = useState<Adapter | undefined>(axyz.wallet);

  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const isDisconnecting = useRef(false);
  const isConnecting = useRef(false);

  const readyState = wallet?.readyState || WalletReadyState.Unsupported;

  const isReady = readyState === WalletReadyState.Installed;
  const isLoadable = readyState === WalletReadyState.Loadable;
  const isUnavailable = !isReady && !isLoadable;

  const isUnloading = useUnloading();

  const { handleError } = useWalletEventListeners({
    axyz,
    isUnloading,
    onError,
    setConnected,
    wallet,
  });

  const selectWallet = useCallback(
    (w: Wallet) => {
      axyz.selectWallet(w);
      setWallet(w);
    },
    [axyz]
  );

  // Connect the adapter to the wallet
  const setWalletAndConnect = useCallback(
    async (w: Adapter) => {
      if (connecting || disconnecting || wallet?.connected) {
        return null;
      }

      const available = handleUnavailableWallet(w, handleError);

      if (!available) return null;

      isConnecting.current = true;
      setConnecting(true);
      try {
        if (!wallet) {
          selectWallet(w);
        }
        await axyz.connectWallet();
        setConnected(true);
      } catch (error: any) {
        axyz.setStoredWalletName(null);
        // Rethrow the error, and handleError will also be called
        throw error;
      } finally {
        setConnecting(false);
        isConnecting.current = false;
      }
      return null;
    },
    [axyz, selectWallet, wallet, connecting, handleError, disconnecting]
  );

  // Disconnect the adapter from the wallet
  const disconnect = useCallback(async () => {
    if (disconnecting) {
      return;
    }

    if (!wallet) {
      return;
    }

    setDisconnecting(true);
    isDisconnecting.current = true;
    try {
      await wallet.disconnect();
      axyz.disconnectWallet();
      setConnected(false);
      setWallet(undefined);
    } finally {
      setDisconnecting(false);
      isDisconnecting.current = false;
    }
  }, [disconnecting, wallet, axyz]);

  useAutoConnect({
    autoConnect,
    wallet,
    isConnecting,
    isDisconnecting,
    setConnecting,
    setConnected,
    connected,
    connecting,
    isUnavailable,
  });

  const context = useMemo(
    () => ({
      wallet,
      installedWallets,
      loadableWallets,
      undetectedWallets,
      connecting,
      disconnecting,
      select: selectWallet,
      connect: setWalletAndConnect,
      disconnect,
      connected,
    }),
    [
      wallet,
      installedWallets,
      loadableWallets,
      undetectedWallets,
      connecting,
      disconnecting,
      selectWallet,
      setWalletAndConnect,
      disconnect,
      connected,
    ]
  );

  return <WalletContext.Provider value={context}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
