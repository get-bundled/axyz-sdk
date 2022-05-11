import { Button, Text } from '@nextui-org/react';
import React from 'react';
import { Box } from '../Blocks';

interface Props {
  cancel: () => void;
  disconnect: () => Promise<void>;
}

const WalletDisconnectOverlay: React.FC<Props> = ({ cancel, disconnect }) => (
  <Box
    css={{
      borderRadius: '$lg',
      background: '$background',
      position: 'absolute',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 210,
    }}
  >
    <Text
      css={{
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '16px',
        textAlign: 'center',
        color: '#0A0B0D',
        marginBottom: '30px',
        width: 199,
        height: 35,
      }}
    >
      Are you sure you want to disconnect?
    </Text>
    <Box
      css={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        bordered
        rounded
        onClick={cancel}
        css={{
          minWidth: 64,
          width: 64,
          height: 28,
          fontWeight: 700,
          fontSize: 12,
          lineHeight: '12px',
          border: '1px solid #ECF0F8',
          background: 'transparent',
          marginRight: '10px',
          color: '#5C616D',
        }}
      >
        cancel
      </Button>
      <Button
        css={{
          minWidth: 116,
          width: 116,
          height: 28,
          fontWeight: 700,
          fontSize: 12,
          lineHeight: '12px',
          border: '1px solid #ECF0F8',
          background: 'transparent',
          color: '#8D8CFB',
        }}
        bordered
        rounded
        onClick={disconnect}
      >
        Yes, disconnect.
      </Button>
    </Box>
  </Box>
);

export default WalletDisconnectOverlay;
