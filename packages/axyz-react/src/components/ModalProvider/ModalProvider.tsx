import { useModal as useNextModal } from '@nextui-org/react';
import React, { FC, useMemo } from 'react';

import { ModalContext } from '../../hooks/useModal';

export interface Props {
  startOpen?: boolean;
}

const ModalProvider: FC<Props> = ({ children, startOpen = false }) => {
  const { visible, setVisible, bindings } = useNextModal(startOpen);

  const context = useMemo(
    () => ({ visible, setVisible, bindings }),
    [bindings, visible, setVisible]
  );

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
