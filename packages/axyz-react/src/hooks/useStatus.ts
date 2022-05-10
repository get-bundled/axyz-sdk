import { useWallet as useEthereumWallet } from './ethereum';
import { useWallet as useSolanaWallet } from './solana';

const useStatus = () => {
  const {
    connected: ethereumConnected,
    loading: ethereumLoading,
    wallet: ethereumWallet,
    address: ethereumAddress,
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
    ethereumAddress,
    solanaLoading: solanaConnecting || solanaDisconnecting || solanaLoading,
    ethereumWallet,
    solanaWallet,
    connected: ethereumConnected || solanaConnected,
  };
};

export default useStatus;
