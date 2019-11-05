import * as React from 'react';

import LocaleProvider from './LocaleProvider';
import ThemeProvider from './ThemeProvider';

import { LocaleProviderProps } from './LocaleProvider/LocaleProvider';
import { ThemeProviderProps } from './ThemeProvider/ThemeProvider';

export interface DSProviderProps extends LocaleProviderProps, ThemeProviderProps {}

const DSProvider: React.FC<DSProviderProps> = props => {
  const { locale, messages, timeZone, children, theme } = props;
  return (
    <LocaleProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LocaleProvider>
  );
};

export default DSProvider;
