import React, { type ReactNode, useState } from 'react';

import type { ToasterProps } from '../Toaster.types';
import { TOASTER_DEFAULTS } from '../constants';
import { ToasterContext } from '../contexts/ToasterContext';

export const ToasterProvider = ({
  children,
  toasterProps = TOASTER_DEFAULTS,
}: {
  children: ReactNode;
  toasterProps: Partial<ToasterProps>;
}) => {
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
