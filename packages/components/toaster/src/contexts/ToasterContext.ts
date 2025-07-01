import { createContext } from 'react';

import { type ToasterProps } from '../Toaster.types';
import { TOASTER_DEFAULTS } from '../constants';

export type ToastContextType = {
  options: Partial<ToasterProps>;
  setOptions: (props: Partial<ToasterProps>) => void;
};

export const ToasterContext = createContext<ToastContextType>({
  options: TOASTER_DEFAULTS,
  setOptions: () => {},
});
