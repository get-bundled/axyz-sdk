import Context from '../../utils/context';

// eslint-disable-next-line import/prefer-default-export
export const CreateConnectWallet = (context: Context) => {
  const connectWallet = async (walletName: string) => {
    const EthereumWallets = context.getEthereum('wallets');
    const wallet = EthereumWallets.find((w) => w.name === walletName);

    if (!wallet) {
      throw new Error(`Wallet ${walletName} not found`);
    }

    try {
      const { account } = await wallet.connect();

      if (!account) {
        return { error: 'Something went wrong connecting', connected: false };
      }

      context.setEthereum('isConnected', true);
      context.setEthereum('wallet', wallet);
      context.setEthereum('address', account);

      return { connected: true };
    } catch (error) {
      return { error: (error as Error).message, connected: false };
    }
  };

  return connectWallet;
};
