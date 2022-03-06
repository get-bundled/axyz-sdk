import { Adapter } from '@solana/wallet-adapter-base';
import { useEffect, useRef } from 'react';
import useAxyz from './useAxyz';

interface Args {
  autoConnect?: boolean;
  wallet?: Adapter;
  setConnecting: (isConnecting: boolean) => void;
  setConnected: (isConnected: boolean) => void;
  connected: boolean;
  connecting: boolean;
  isConnecting: React.MutableRefObject<boolean>;
  isDisconnecting: React.MutableRefObject<boolean>;
  isUnavailable: boolean;
}

const useAutoConnect = ({
  autoConnect,
  wallet,
  setConnecting,
  setConnected,
  isConnecting,
  isDisconnecting,
  connecting,
  isUnavailable,
  connected,
}: Args) => {
  const axyz = useAxyz();
  const autoConnectFailed = useRef(false);

  // If autoConnect is enabled, try to connect when the adapter changes and is ready
  useEffect(() => {
    const skipAutoConnect =
      !autoConnect ||
      !wallet ||
      isUnavailable ||
      isConnecting.current ||
      isDisconnecting.current ||
      connecting ||
      connected ||
      autoConnectFailed.current;

    if (skipAutoConnect) {
      return;
    }

    const doAutoConnect = async () => {
      // eslint-disable-next-line no-param-reassign
      isConnecting.current = true;
      setConnecting(true);
      try {
        await axyz.autoConnect();
        setConnected(true);
      } catch (err) {
        axyz.setStoredWalletName(null);
        autoConnectFailed.current = true;
        // Don't throw error, but handleError will still be called
      } finally {
        // eslint-disable-next-line no-param-reassign
        isConnecting.current = false;
        setConnecting(false);
      }
    };

    doAutoConnect();
  }, [
    autoConnect,
    wallet,
    isUnavailable,
    isConnecting,
    isDisconnecting,
    connecting,
    connected,
    axyz,
    setConnecting,
    setConnected,
  ]);
};

export default useAutoConnect;
