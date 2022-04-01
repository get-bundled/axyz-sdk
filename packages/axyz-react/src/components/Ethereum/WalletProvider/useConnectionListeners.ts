import { AxyzSDKInstance } from '@axyzsdk/js';
import { useEffect, useRef } from 'react';
import { useConnect } from 'wagmi';

const useConnectionListeners = (axyz: AxyzSDKInstance) => {
  const [{ data: connectData }] = useConnect();
  const { connected, connector: wallet } = connectData;

  const isConnected = useRef(connected);

  useEffect(() => {
    const didDisconnect = isConnected.current && !connected;
    const didConnect = !isConnected.current && connected;

    if (didConnect && wallet) {
      axyz.ethereum.emit('connect', wallet, () => {
        isConnected.current = true;
      });
    }

    if (didDisconnect) {
      axyz.ethereum.emit('disconnect', () => {
        isConnected.current = false;
      });
    }
  }, [connected, wallet, axyz.ethereum]);
};

export default useConnectionListeners;
