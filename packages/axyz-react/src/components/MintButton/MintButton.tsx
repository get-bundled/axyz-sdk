import { Button, CSS, keyframes, Loading } from '@nextui-org/react';
import React, { useCallback } from 'react';
import useAxyz from '../../hooks/useAxyz';

interface Props {
  onClick?: () => void;
  onSuccess?: () => void;
  onError?: (e: string) => void;
  css?: CSS;
  mintId: string;
}

const rotateAnimation = keyframes({
  '0%': { backgroundPosition: '14% 0%' },
  '50%': { backgroundPosition: '87% 100%' },
  '100%': { backgroundPosition: '14% 0%' },
});

const MintButton: React.FC<Props> = ({ mintId, onClick, onError, onSuccess, css }: Props) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const axyz = useAxyz();

  const doClick = useCallback(async () => {
    if (!mintId) {
      throw new Error('mintId is required');
    }

    setLoading(true);
    if (onClick) {
      onClick();
    }

    try {
      const { error: e } = await axyz.mintToken(mintId);
      if (e) {
        onError?.(e);
        setError(e);
      } else {
        onSuccess?.();
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  }, [axyz, mintId, onClick, onError, onSuccess]);

  return (
    <Button
      // eslint-disable-next-line no-nested-ternary
      color={error ? 'error' : success ? 'success' : 'gradient'}
      css={{ ...css, animation: `${rotateAnimation.name} linear 1s infinite;` }}
      onClick={doClick}
      ghost
      shadow
    >
      {loading ? <Loading type="points-opacity" /> : 'MINT'}
    </Button>
  );
};

export default MintButton;
