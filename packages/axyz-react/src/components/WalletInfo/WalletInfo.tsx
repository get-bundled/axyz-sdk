import React from 'react';
import { styled, Text, Button } from '@nextui-org/react';
import { Box } from '../Blocks';

interface Props {
  address: string;
  name: string;
  Icon: JSX.Element;
  setDisconnect: () => void;
}

const Root = styled('div', {
  maxWidth: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
});

const FlexColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const WalletInfo: React.FC<Props> = ({ address, name, Icon, setDisconnect }) => (
  <Root>
    <Box css={{ display: 'flex', flexFlow: 'row' }}>
      <div style={{ height: 40, marginRight: 10 }}>{Icon}</div>
      <FlexColumn>
        <Text
          css={{
            color: '#0A0B0D',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '16px',
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
        <Text
          css={{
            color: '#5C616D',
            fontWeight: 700,
            fontSize: 12,
            lineHeight: '12px',
          }}
        >
          {address &&
            `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`}
        </Text>
      </FlexColumn>
    </Box>
    <Button
      light
      css={{
        minWidth: 'unset',
        padding: 8,
        display: 'flex',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: '12px',
        color: '#8D8CFB',
      }}
      onClick={setDisconnect}
    >
      Disconnect
    </Button>
  </Root>
);

export default WalletInfo;
