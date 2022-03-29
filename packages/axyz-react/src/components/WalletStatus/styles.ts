import type { CSS } from '@nextui-org/react';

export const Box: CSS = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const FlexColumn: CSS = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const WalletPill: CSS = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '$accents2',
  borderRadius: '$pill',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  width: '300px',
  padding: '$4',
  my: '$2',
  height: '90px',
};

export const EthereumLogo: CSS = {
  padding: '6px',
  borderRadius: '100%',
  background: 'white',
  marginLeft: '2px',
};

export const SolanaLogo: CSS = {
  padding: '6px',
  borderRadius: '100%',
  background: 'white',
  marginLeft: '2px',
};

export const WalletIcon: CSS = {
  width: '$10',
  height: '$10',
};
