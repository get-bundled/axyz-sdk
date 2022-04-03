import { useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import type { AxyzSDKInstance } from '@axyzsdk/js';
import { SolanaWallet } from '../../../types';

const useConnectionListeners = (axyz: AxyzSDKInstance) => {
  const { connected, wallet } = useWallet();

  const isConnected = useRef(connected);

  useEffect(() => {
    const didDisconnect = isConnected.current && !connected;
    const didConnect = !isConnected.current && connected;

    if (didConnect && wallet) {
      axyz.solana.emit('connect', wallet.adapter as SolanaWallet, () => {
        isConnected.current = true;
      });
    }

    if (didDisconnect) {
      axyz.solana.emit('disconnect', () => {
        isConnected.current = false;
      });
    }
  }, [connected, wallet, axyz.solana]);
};

export default useConnectionListeners;
