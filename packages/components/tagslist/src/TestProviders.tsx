import React, { ReactNode } from 'react';
import { NOOP } from '@synerise/ds-utils';
import { IntlProvider } from 'react-intl';

const Providers = ({ children }: { children: ReactNode}) => (
  <IntlProvider locale="en" onError={NOOP}>
    {children}
  </IntlProvider>
);

export default Providers;
