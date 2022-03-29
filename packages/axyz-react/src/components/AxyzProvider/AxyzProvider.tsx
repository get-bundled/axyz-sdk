import React, { useMemo } from 'react';
import Axyz, { type AxyzSDKOptions } from '@axyzsdk/js';
import { createTheme, NextUIProvider } from '@nextui-org/react';

import SolanaConnectionProvider from '../Solana/ConnectionProvider';
import SolanaWalletProvider from '../Solana/WalletProvider';

import EthereumWalletProvider from '../Ethereum/WalletProvider';

import ModalConnect from '../ModalConnect';

import { AxyzContext } from '../../hooks/useAxyz';
import ModalProvider from '../ModalProvider';
import ThemeController from './ThemeController';

interface Props extends AxyzSDKOptions {
  apiKey: string;
  darkMode?: boolean;
  connectModal?: boolean;
}

const AxyzProvider: React.FC<Props> = ({
  children,
  environment,
  solanaNetwork,
  ethereumChain,
  apiKey,
  onError,
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

  const { solana } = axyz;

  return (
    <NextUIProvider theme={theme} disableBaseline>
      <ThemeController darkMode={darkMode} />
      <AxyzContext.Provider value={axyz}>
        <EthereumWalletProvider autoConnect={ethereumAutoConnect}>
          <SolanaConnectionProvider connection={solana.connection}>
            <SolanaWalletProvider autoConnect={solanaAutoConnect} onError={onError}>
              <ModalProvider>
                {connectModal && <ModalConnect onError={onError} />}
                {children}
              </ModalProvider>
            </SolanaWalletProvider>
          </SolanaConnectionProvider>
        </EthereumWalletProvider>
      </AxyzContext.Provider>
    </NextUIProvider>
  );
};

export default AxyzProvider;
