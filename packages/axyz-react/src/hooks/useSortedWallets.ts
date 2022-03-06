import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useCallback, useEffect, useState, useMemo } from 'react';
import useAxyz from './useAxyz';
import { Wallet } from '../types/wallet';

interface ReadyStateMapping {
  [walletName: string]: WalletReadyState;
}

const useSortedWallets = () => {
  const axyz = useAxyz();

  const [readyStates, setReadyStates] = useState<ReadyStateMapping>(
    axyz.wallets.reduce((acc, wallet) => {
      acc[wallet.name] = wallet.readyState;
      return acc;
    }, {} as ReadyStateMapping)
  );

  const [wallets, setWallets] = useState(axyz.wallets);

  const filterWalletsByReadyState = useCallback(
    (readyState: WalletReadyState) => wallets.filter((w) => readyStates[w.name] === readyState),
    [wallets, readyStates]
  );

  const installedWallets = useMemo(
    () => filterWalletsByReadyState(WalletReadyState.Installed),
    [filterWalletsByReadyState]
  );

  const loadableWallets = useMemo(
    () => filterWalletsByReadyState(WalletReadyState.Loadable),
    [filterWalletsByReadyState]
  );

  const undetectedWallets = useMemo(
    () => filterWalletsByReadyState(WalletReadyState.NotDetected),
    [filterWalletsByReadyState]
  );
  // When the wallets change, start to listen for changes to their `readyState`
  const handleReadyStateChange = useCallback(
    (wallet: Wallet) => (readyState: WalletReadyState) => {
      setReadyStates((prevReadyStates) => ({
        ...prevReadyStates,
        [wallet.name]: readyState,
      }));
    },
    []
  );

  useEffect(() => {
    wallets.forEach((wallet) => {
      wallet.on('readyStateChange', handleReadyStateChange(wallet));
    });

    return () => {
      wallets.forEach((wallet) => {
        wallet.off('readyStateChange', handleReadyStateChange(wallet));
      });
    };
  }, [wallets, handleReadyStateChange]);

  return {
    wallets,
    setWallets,
    installedWallets,
    loadableWallets,
    undetectedWallets,
  };
};

export default useSortedWallets;
