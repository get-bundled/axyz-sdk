import type Context from './context';

const checkForConnectedWalletsOnChains = async (chains: string[], context: Context) => {
  const hasConnectedWalletForRequiredChain = chains.some((chain) => {
    if (chain === 'SOL') {
      return context.getSolana('isConnected');
    }
    if (chain === 'ETH') {
      return context.getEthereum('isConnected');
    }
    return false;
  });

  return hasConnectedWalletForRequiredChain;
};

export default checkForConnectedWalletsOnChains;
