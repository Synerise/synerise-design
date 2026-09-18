import { createContext } from 'react';

import { TOASTER_DEFAULTS } from '../constants';
import type { ToasterProps } from '../Toaster.types';

export type ToastContextType = {
  options: Partial<ToasterProps>;
  setOptions: (props: Partial<ToasterProps>) => void;
};

export const ToasterContext = createContext<ToastContextType>({
  options: TOASTER_DEFAULTS,
  setOptions: () => {},
});
