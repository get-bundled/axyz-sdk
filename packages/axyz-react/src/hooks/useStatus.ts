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
  } = useSolanaWallet();

  return {
    ethereumConnected,
    solanaConnected,
    ethereumLoading,
    solanaLoading: solanaConnecting || solanaDisconnecting,
    ethereumWallet,
    solanaWallet,
    connected: ethereumConnected || solanaConnected,
  };
};

export default useStatus;
