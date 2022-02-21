import { PublicKey } from '@solana/web3.js';
import type { Tokens } from '../types';
import Context from './context';

const checkTokenBalances = async (context: Context, mintsForEntitlement: Tokens) => {
  const connection = context.get('connection');
  const publicKey = context.get('publicKey');

  if (!publicKey) {
    throw new Error('Public key not found. Please ensure a wallet is connected.');
  }

  let isEntitled = false;
  for (let i = 0; i < mintsForEntitlement.length; i += 1) {
    const mint = mintsForEntitlement[i];
    // eslint-disable-next-line no-await-in-loop
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      publicKey,
      { mint: new PublicKey(mint.publicKey) },
      'finalized'
    );

    const tokenAccount = tokenAccounts.value[0]?.pubkey;

    if (tokenAccount) {
      // eslint-disable-next-line no-await-in-loop
      const tokenAccountBalance = await connection.getTokenAccountBalance(
        tokenAccount,
        'finalized'
      );

      const {
        value: { uiAmount: balance },
      } = tokenAccountBalance;

      if (balance && balance > 0) {
        isEntitled = true;
        break;
      }
    }
  }

  return isEntitled;
};

export default checkTokenBalances;
