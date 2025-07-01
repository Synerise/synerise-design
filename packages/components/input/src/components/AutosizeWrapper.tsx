import React, { forwardRef } from 'react';

import AutosizeInput from '../AutosizeInput/AutosizeInput';
import type {
  AutosizeInputRefType,
  AutosizeWrapperProps,
} from '../AutosizeInput/AutosizeInput.types';

const AUTOSIZE_EXTRA_WIDTH = 2;

export const AutosizeWrapper = forwardRef<
  AutosizeInputRefType,
  AutosizeWrapperProps
>(
  (
    { autoResize, extraWidth = AUTOSIZE_EXTRA_WIDTH, children, ...props },
    ref,
  ) => {
    if (autoResize) {
      return (
        <AutosizeInput ref={ref} extraWidth={extraWidth} {...props}>
          {children}
        </AutosizeInput>
      );
    }
    return <>{children}</>;
  },
);
