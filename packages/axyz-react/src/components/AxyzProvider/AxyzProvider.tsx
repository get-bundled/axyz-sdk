import React, { useMemo } from 'react';
import Axyz from '@axyzsdk/js';
import type { AxyzSDKOptions } from '@axyzsdk/js';
import { createTheme, NextUIProvider } from '@nextui-org/react';

import ConnectionProvider from '../ConnectionProvider';
import WalletProvider from '../WalletProvider';
import ModalConnect from '../ModalConnect';

import { AxyzContext } from '../../hooks/useAxyz';
import ModalProvider from '../ModalProvider';
import ThemeController from './ThemeController';

interface Props extends AxyzSDKOptions {
  apiKey: string;
  darkMode?: boolean;
  autoConnect?: boolean;
  connectModal?: boolean;
}

const AxyzProvider: React.FC<Props> = ({
  children,
  environment,
  solanaNetwork,
  apiKey,
  connectModal = true,
  autoConnect = true,
  darkMode = true,
}) => {
  const theme = useMemo(
    () => createTheme({ type: darkMode ? 'dark' : 'light' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkMode]
  );

  const axyz = useMemo(
    () =>
      Axyz(apiKey, {
        environment,
        solanaNetwork,
        autoConnect,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiKey, environment, solanaNetwork]
  );

  const { connection } = axyz;

  return (
    <NextUIProvider theme={theme} disableBaseline>
      <ThemeController darkMode={darkMode} />
      <AxyzContext.Provider value={axyz}>
        <ConnectionProvider connection={connection}>
          <WalletProvider autoConnect={autoConnect}>
            <ModalProvider>
              {connectModal && <ModalConnect />}
              {children}
            </ModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </AxyzContext.Provider>
    </NextUIProvider>
  );
};

export default AxyzProvider;
