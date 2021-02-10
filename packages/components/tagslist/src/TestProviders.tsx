import React from 'react';
import { NOOP } from '@synerise/ds-utils';
import { IntlProvider } from 'react-intl';

const Providers: React.FC = ({ children }) => (
  <IntlProvider locale="en" onError={NOOP}>
    {children}
  </IntlProvider>
);

export default Providers;
