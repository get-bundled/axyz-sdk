import { createContext, useContext } from 'react';

export interface ModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
}

export const ModalContext = createContext<ModalContextState>({} as ModalContextState);

const useModal = (): ModalContextState => useContext(ModalContext);

export default useModal;
