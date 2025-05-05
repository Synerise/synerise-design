import React, { ReactNode, useState } from 'react';

import { TOASTER_DEFAULTS } from '../constants';
import { ToasterContext } from '../contexts/ToasterContext';
import type { ToasterProps } from '../Toaster.types';

export const ToasterProvider = ({ children, toasterProps = TOASTER_DEFAULTS }: { children: ReactNode; toasterProps: Partial<ToasterProps> }) => {
  const [options, setOptions] = useState<Partial<ToasterProps>>(toasterProps);
  
  return (
    <ToasterContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </ToasterContext.Provider>
  );
};
