import React, { useState } from 'react';
import { styled, Text } from '@nextui-org/react';
import useModal from '../../hooks/useModal';

const WalletPillBox = styled('button', {
  appearance: 'none',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$pill',
  width: '250px',
  padding: '$4',
  my: '$4',
  height: '50px',
  border: 'none',
  transition: 'box-shadow .2s ease-in-out',
  backgroundColor: '$accents2',

  '&::after': {
    content: '""',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '$pill',
    transition: 'box-shadow 0.3s ease-in-out',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  '&:hover::after': {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.50)',
  },

  variants: {
    status: {
      base: {
        backgroundColor: '$accents2',
        boxShadow: 'inset 0 0 0 0 $colors$error',
      },
      disconnect: {
        boxShadow: 'inset 400px 0 0 0 $colors$error',
      },
    },
  },
});

const IconBox = styled('div', {
  mr: '$3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TitleBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const StatusCircle = styled('div', {
  marginLeft: 'auto',
  marginRight: '30px',
  width: '8px',
  height: '8px',
  borderRadius: '100%',
  variants: {
    fill: {
      connected: {
        backgroundColor: '$success',
        boxShadow: '0 0 0 5px rgb(164 255 129 / 10%)',
      },
      disconnected: {
        backgroundColor: '$error',
        boxShadow: '0 0 0 5px rgba(242, 19, 97, 0.1)',
      },
      loading: {
        backgroundColor: '$warning',
        boxShadow: '0 0 0 5px rgba(245, 166, 35, 0.1)',
      },
    },
  },
});

interface Props {
  icon: JSX.Element;
  name: string;
  connected: boolean;
  error?: boolean;
  loading: boolean;
  disconnect?: () => void | Promise<void>;
}

const WalletPill: React.FC<Props> = ({ icon, name, connected, loading, error, disconnect }) => {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const { setVisible } = useModal();

  let status = 'Disconnected';
  let fill = 'disconnected';
  if (connected) {
    status = 'Connected';
    fill = 'connected';
  }
  if (loading) {
    status = 'Connecting';
    fill = 'loading';
  }
  if (error) {
    status = 'Error';
    fill = 'disconnected';
  }

  const onClick = async () => {
    if (showDisconnect) {
      await disconnect?.();
      return setShowDisconnect(false);
    }
    if (connected) {
      return setShowDisconnect(true);
    }
    return setVisible(true);
  };

  return (
    <WalletPillBox onClick={onClick} status={showDisconnect ? 'disconnect' : 'base'}>
      <IconBox>{icon}</IconBox>
      <TitleBox>
        <Text size={15} css={{ lineHeight: '17px' }}>
          {name}
        </Text>
        <Text
          size={15}
          css={{ color: showDisconnect ? '$accents8' : '$accents4', lineHeight: '17px' }}
        >
          {showDisconnect ? 'Confirm Disconnect?' : status}
        </Text>
      </TitleBox>
      <StatusCircle fill={fill as 'connected' | 'disconnected' | 'loading'} />
    </WalletPillBox>
  );
};

export default WalletPill;
