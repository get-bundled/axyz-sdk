import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface ModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
  openModal: (chain?: 'ETH' | 'SOL') => void;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
  setShowETHWallets: Dispatch<SetStateAction<boolean>>;
  setShowSOLWallets: Dispatch<SetStateAction<boolean>>;
  showSOLWallets: boolean;
  showETHWallets: boolean;
}

export const ModalContext = createContext<ModalContextState>({} as ModalContextState);

const useModal = (): ModalContextState => useContext(ModalContext);

export default useModal;
