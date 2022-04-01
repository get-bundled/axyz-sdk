import { AxyzSDKInstance, EthereumWallet } from '@axyzsdk/js';
import { useState, useEffect } from 'react';

interface WalletState {
  connected: boolean;
  wallet?: EthereumWallet | null;
}

const useAxyzWalletState = (axyz: AxyzSDKInstance) => {
  const [state, setState] = useState<WalletState>({
    connected: !!axyz.ethereum.isConnected,
    wallet: axyz.ethereum.wallet,
  });

  useEffect(() => {
    axyz.ethereum.on('axyzEthereumChange', () => {
      setState({
        connected: !!axyz.ethereum.isConnected,
        wallet: axyz.ethereum.wallet,
      });
    });

    return () => {
      axyz.ethereum.off('axyzEthereumChange');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useAxyzWalletState;
