import EventEmitter from 'eventemitter3';

import type { AxyzSolanaEvents } from '../types/solana';

class SolanaEvents extends EventEmitter<AxyzSolanaEvents> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
}

export default SolanaEvents;
