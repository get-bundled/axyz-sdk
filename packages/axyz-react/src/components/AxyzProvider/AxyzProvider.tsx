import React, { useMemo } from 'react';
import Axyz, { type AxyzSDKOptions } from '@axyzsdk/js';
import { createTheme, CSS, NextUIProvider } from '@nextui-org/react';
import { WagmiProvider } from 'wagmi';
import {
  ConnectionProvider as SolanaConnectionProvider,
  WalletProvider as SolanaProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

import EthereumWalletProvider from '../Ethereum/WalletProvider';
import SolanaWalletProvider from '../Solana/WalletProvider';

import ModalConnect from '../ModalConnect';

import { AxyzContext } from '../../hooks/useAxyz';
import ModalProvider from '../ModalProvider';
import ThemeController from './ThemeController';

interface Props extends AxyzSDKOptions {
  apiKey: string;
  darkMode?: boolean;
  connectModal?: boolean;
  modalCss?: CSS;
}

const AxyzProvider: React.FC<Props> = ({
  children,
  environment,
  solanaNetwork,
  ethereumChain,
  apiKey,
  onError,
  modalCss,
  connectModal = true,
  ethereumAutoConnect = true,
  solanaAutoConnect = true,
  darkMode = true,
}) => {
  const theme = useMemo(() => createTheme({ type: darkMode ? 'dark' : 'light' }), [darkMode]);

  const axyz = useMemo(
    () =>
      Axyz(apiKey, {
        environment,
        solanaNetwork,
        solanaAutoConnect,
        ethereumChain,
        ethereumAutoConnect,
        onError,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiKey, environment, solanaNetwork]
  );

  return (
    <NextUIProvider theme={theme} disableBaseline>
      <ThemeController darkMode={darkMode} />
      <AxyzContext.Provider value={axyz}>
        <WagmiProvider
          autoConnect={ethereumAutoConnect}
          connectors={axyz.ethereum.wallets}
          connectorStorageKey="axyz.ethereum"
        >
          <SolanaConnectionProvider endpoint={clusterApiUrl(solanaNetwork)}>
            <SolanaProvider
              autoConnect={solanaAutoConnect}
              onError={onError}
              wallets={axyz.solana.wallets}
              localStorageKey="axyz:solana:wallet"
            >
              <EthereumWalletProvider autoConnect={ethereumAutoConnect}>
                <SolanaWalletProvider autoConnect={solanaAutoConnect}>
                  <ModalProvider>
                    {connectModal && <ModalConnect css={modalCss} onError={onError} />}
                    {children}
                  </ModalProvider>
                </SolanaWalletProvider>
              </EthereumWalletProvider>
            </SolanaProvider>
          </SolanaConnectionProvider>
        </WagmiProvider>
      </AxyzContext.Provider>
    </NextUIProvider>
  );
};

export default AxyzProvider;
