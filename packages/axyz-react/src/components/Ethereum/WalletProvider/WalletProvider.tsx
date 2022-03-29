import React from 'react';
import { WagmiProvider } from 'wagmi';
import { useAxyz } from '../../../hooks';

interface Props {
  autoConnect?: boolean;
}

const WalletProvider: React.FC<Props> = ({ children, autoConnect }) => {
  const axyz = useAxyz();
  return (
    <WagmiProvider
      autoConnect={autoConnect}
      connectors={axyz.ethereum.wallets}
      connectorStorageKey="axyz.ethereum"
    >
      {children}
    </WagmiProvider>
  );
};

export default WalletProvider;
