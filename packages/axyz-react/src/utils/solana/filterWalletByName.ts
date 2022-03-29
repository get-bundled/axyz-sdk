import { Adapter } from '@solana/wallet-adapter-base';

const filterWalletByName = (wallet: Adapter) => (w: Adapter) => w.name === wallet.name;

export default filterWalletByName;
