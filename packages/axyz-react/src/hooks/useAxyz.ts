import { AxyzSDKInstance } from '@axyzsdk/js';
import { createContext, useContext } from 'react';

export const AxyzContext = createContext<AxyzSDKInstance>({} as AxyzSDKInstance);

const useAxyz = (): AxyzSDKInstance => useContext(AxyzContext);

export default useAxyz;
