import React, { PropsWithChildren } from 'react';

import { DataFormatConfigProvider, DataFormatConfigProviderProps } from '@synerise/ds-data-format';

import '../style';
import LocaleProvider from './LocaleProvider';
import ThemeProvider from './ThemeProvider';

import { LocaleProviderProps } from './LocaleProvider/LocaleProvider';
import { ThemeProviderProps } from './ThemeProvider/ThemeProvider';

export type DSProviderProps = PropsWithChildren<
  LocaleProviderProps & ThemeProviderProps & DataFormatConfigProviderProps
>;

const DSProvider = ({
  locale,
  defaultLocale,
  messages,
  timeZone,
  children,
  theme,
  dataFormatConfig,
  onErrorIntl,
}: DSProviderProps) => {
  return (
    <LocaleProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      defaultLocale={defaultLocale}
      onErrorIntl={onErrorIntl}
    >
      <ThemeProvider theme={theme}>
        <DataFormatConfigProvider dataFormatConfig={dataFormatConfig}>{children}</DataFormatConfigProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default DSProvider;
