import type { SolanaWallet } from './wallet';

type Callback = (() => void) | (() => Promise<void>);

export interface AxyzSolanaEvents {
  connect(wallet: SolanaWallet, callback?: Callback): void;
  disconnect(callback?: Callback): void;
  axyzSolanaChange(): void;
}
