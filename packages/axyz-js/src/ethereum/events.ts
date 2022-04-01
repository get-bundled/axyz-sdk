import EventEmitter from 'eventemitter3';

import type { AxyzEthereumEvents } from '../types/ethereum';

class EthereumEvents extends EventEmitter<AxyzEthereumEvents> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
}

export default EthereumEvents;
