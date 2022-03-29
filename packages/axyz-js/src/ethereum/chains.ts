import { Chain, chain } from 'wagmi-core';
import { ChainName } from '../types';

export const supportedChains = [chain.mainnet, chain.ropsten, chain.rinkeby, chain.kovan];

export const getSupportedChain = (chainName: ChainName): Chain[] => {
  const matchedChain = supportedChains.find((c) => c.name === chainName);
  if (!matchedChain) {
    return supportedChains;
  }
  return [matchedChain];
};
