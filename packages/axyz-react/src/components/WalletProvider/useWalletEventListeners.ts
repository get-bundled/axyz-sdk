import { AxyzSDKInstance } from '@axyzsdk/js';
import { Adapter, WalletError } from '@solana/wallet-adapter-base';
import { MutableRefObject, useCallback, useEffect } from 'react';

interface Args {
  axyz: AxyzSDKInstance;
  isUnloading: MutableRefObject<boolean>;
  onError?: (error: WalletError) => void;
  setConnected: (connected: boolean) => void;
  wallet: Adapter | undefined;
  setWallet: (wallet: Adapter | undefined) => void;
}
const useWalletEventListeners = ({
  axyz,
  isUnloading,
  onError,
  setConnected,
  wallet,
  setWallet,
}: Args) => {
  // Handle the adapter's error event, and local errors
  const handleError = useCallback(
    (error: WalletError) => {
      // Call onError unless the window is unloading
      if (!isUnloading.current) {
        if (wallet) {
          axyz.clearWallet(wallet);
          setWallet(undefined);
        }
        if (onError) {
          onError(error);
        } else {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    },
    [isUnloading, onError, wallet, axyz, setWallet]
  );

  // Handle the adapter's connect event
  const handleConnect = useCallback(() => {
    setConnected(true);
  }, [setConnected]);

  // Handle the adapter's disconnect event
  const handleDisconnect = useCallback(() => {
    if (!isUnloading.current) {
      setConnected(false);
    }
  }, [isUnloading, setConnected]);

  // // When the adapter changes, disconnect the old one
  useEffect(
    () => () => {
      if (wallet) {
        axyz.clearWallet(wallet);
        wallet.disconnect();
      }
    },
    [wallet, axyz]
  );

  // Setup and teardown event listeners when the adapter changes
  useEffect(() => {
    if (wallet) {
      wallet.on('connect', handleConnect);
      wallet.on('disconnect', handleDisconnect);
      wallet.on('error', handleError);
      return () => {
        wallet.off('connect', handleConnect);
        wallet.off('disconnect', handleDisconnect);
        wallet.off('error', handleError);
      };
    }
    return () => {};
  }, [wallet, handleDisconnect, handleError, handleConnect]);

  return { handleError };
};

export default useWalletEventListeners;
