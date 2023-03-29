import '../style';
import * as React from 'react';

import { DataFormatConfigProvider, DataFormatConfigProviderProps } from '@synerise/ds-data-format';

import LocaleProvider from './LocaleProvider';
import ThemeProvider from './ThemeProvider';

import { LocaleProviderProps } from './LocaleProvider/LocaleProvider';
import { ThemeProviderProps } from './ThemeProvider/ThemeProvider';

export interface DSProviderProps extends LocaleProviderProps, ThemeProviderProps, DataFormatConfigProviderProps {}

const DSProvider: React.FC<DSProviderProps> = props => {
  const { locale, messages, timeZone, children, theme, dataFormatConfig } = props;

  return (
    <LocaleProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ThemeProvider theme={theme}>
        <DataFormatConfigProvider dataFormatConfig={dataFormatConfig}>{children}</DataFormatConfigProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default DSProvider;
