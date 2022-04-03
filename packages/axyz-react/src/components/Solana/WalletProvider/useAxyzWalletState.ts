import { AxyzSDKInstance, SolanaWallet } from '@axyzsdk/js';
import { useState, useEffect } from 'react';

interface WalletState {
  connected: boolean;
  wallet?: SolanaWallet | null;
}

const useAxyzWalletState = (axyz: AxyzSDKInstance) => {
  const [state, setState] = useState<WalletState>({
    connected: !!axyz.solana.isConnected,
    wallet: axyz.solana.wallet,
  });

  useEffect(() => {
    axyz.solana.on('axyzSolanaChange', () => {
      setState({
        connected: !!axyz.solana.isConnected,
        wallet: axyz.solana.wallet,
      });
    });

    return () => {
      axyz.solana.off('axyzSolanaChange');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useAxyzWalletState;
