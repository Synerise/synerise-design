import React, { type PropsWithChildren } from 'react';

import {
  DataFormatConfigProvider,
  type DataFormatConfigProviderProps,
} from '@synerise/ds-data-format';
import Toaster, {
  TOASTER_DEFAULTS,
  type ToasterProps,
  ToasterProvider,
} from '@synerise/ds-toaster';

import '../style';
import LocaleProvider from './LocaleProvider';
import { type LocaleProviderProps } from './LocaleProvider/LocaleProvider.types';
import ThemeProvider from './ThemeProvider';
import { type ThemeProviderProps } from './ThemeProvider/ThemeProvider';

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
