import React, { FC, useMemo } from 'react';
import type { Connection } from '@solana/web3.js';

import { ConnectionContext } from '../../hooks/useConnection';

export interface Props {
  connection: Connection;
}

const ConnectionProvider: FC<Props> = ({ children, connection }) => {
  const context = useMemo(() => ({ connection }), [connection]);
  return <ConnectionContext.Provider value={context}>{children}</ConnectionContext.Provider>;
};

export default ConnectionProvider;
