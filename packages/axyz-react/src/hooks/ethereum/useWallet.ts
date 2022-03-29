import { useAccount } from 'wagmi';

// eslint-disable-next-line import/prefer-default-export
export const useWallet = () => {
  const [{ data, error, loading }, disconnect] = useAccount();

  return {
    connected: !!data?.connector,
    wallet: data?.connector,
    loading,
    error,
    disconnect,
  };
};
