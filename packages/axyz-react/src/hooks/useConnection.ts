import { createContext, useContext } from 'react';
import { Connection } from '@solana/web3.js';

export interface ConnectionContextState {
  connection: Connection;
}

export const ConnectionContext = createContext<ConnectionContextState>(
  {} as ConnectionContextState
);

const useConnection = (): ConnectionContextState => useContext(ConnectionContext);
export default useConnection;
