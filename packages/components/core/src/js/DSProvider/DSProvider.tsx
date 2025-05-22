import React, { PropsWithChildren } from 'react';
import { DataFormatConfigProvider, DataFormatConfigProviderProps } from '@synerise/ds-data-format';
import Toaster, { ToasterProps, ToasterProvider, TOASTER_DEFAULTS } from '@synerise/ds-toaster';

import '../style';
import LocaleProvider from './LocaleProvider';
import ThemeProvider from './ThemeProvider';

import { LocaleProviderProps } from './LocaleProvider/LocaleProvider.types';
import { ThemeProviderProps } from './ThemeProvider/ThemeProvider';

export type DSProviderProps = PropsWithChildren<
  LocaleProviderProps &
    ThemeProviderProps &
    DataFormatConfigProviderProps & {
      toasterProps?: false | Partial<ToasterProps>;
    }
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
  toasterProps = false,
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
        <DataFormatConfigProvider dataFormatConfig={dataFormatConfig}>
          <ToasterProvider toasterProps={toasterProps || TOASTER_DEFAULTS}>
            {children}
            {toasterProps !== false && <Toaster />}
          </ToasterProvider>
        </DataFormatConfigProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default DSProvider;
