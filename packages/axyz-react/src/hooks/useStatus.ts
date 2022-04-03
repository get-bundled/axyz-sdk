import { useWallet as useEthereumWallet } from './ethereum';
import { useWallet as useSolanaWallet } from './solana';

const useStatus = () => {
  const {
    connected: ethereumConnected,
    loading: ethereumLoading,
    wallet: ethereumWallet,
  } = useEthereumWallet();

  const {
    connecting: solanaConnecting,
    disconnecting: solanaDisconnecting,
    connected: solanaConnected,
    wallet: solanaWallet,
    loading: solanaLoading,
  } = useSolanaWallet();

  return {
    loading: ethereumLoading || solanaLoading,
    ethereumConnected,
    solanaConnected,
    ethereumLoading,
    solanaLoading: solanaConnecting || solanaDisconnecting || solanaLoading,
    ethereumWallet,
    solanaWallet,
    connected: ethereumConnected || solanaConnected,
  };
};

export default useStatus;
