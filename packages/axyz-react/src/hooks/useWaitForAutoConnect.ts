import { useEffect, useRef, useState } from 'react';

type Timeout = ReturnType<typeof setTimeout>;

/**
 * @description Auto-connect takes a bit of time to boot up and start the connection process and since
 * we depend on wagmi and solana wallet adapter, we just have a hook with a timeout to handle this
 */
const useWaitForAutoConnect = (connected: boolean, autoConnect: boolean) => {
  const [waitingForAutoConnect, setWaitingForAutoConnect] = useState(autoConnect);

  const timeoutRef = useRef<Timeout>();
  useEffect(() => {
    if (autoConnect) {
      timeoutRef.current = setTimeout(() => {
        setWaitingForAutoConnect(false);
      }, 200);
    }
    // Only need to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connected && waitingForAutoConnect) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setWaitingForAutoConnect(false);
    }
  }, [connected, waitingForAutoConnect]);

  return waitingForAutoConnect;
};

export default useWaitForAutoConnect;
