import React from 'react';
import { IntlProvider } from 'react-intl';

import { flatten } from 'flat';
import * as merge from 'deepmerge';
import AntConfigProvider from 'antd/lib/config-provider';

import { IntlMessages, LocaleProviderProps, NestedMessages } from './LocaleProvider.types';
import antMessages from './antLocales';
import dsMessages from '../../../i18n';

const DEFAULT_LANG = 'en-US';
const getLangForCode = (code: string): string => code.substring(0, 2);

const LocaleProvider = ({
  locale = DEFAULT_LANG,
  defaultMessages = {},
  messages = {},
  defaultLocale,
  timeZone,
  children,
  onErrorIntl,
}: LocaleProviderProps) => {
  const code = locale || DEFAULT_LANG;
  const lang = getLangForCode(code);

  const antLocale = Object.prototype.hasOwnProperty.call(antMessages, lang) ? antMessages[lang] : antMessages.default;
  const dsLocale = Object.prototype.hasOwnProperty.call(dsMessages, lang) ? dsMessages[lang] : dsMessages.default;
  const localeData = messages[lang] || {};
  const currentMessages: IntlMessages = flatten({
    ...dsLocale,
    ...merge.all([defaultMessages, localeData as NestedMessages]),
  });

  return (
    <AntConfigProvider locale={antLocale}>
      <IntlProvider
        textComponent="span"
        locale={code}
        messages={currentMessages}
        timeZone={timeZone}
        defaultLocale={defaultLocale}
        onError={error => onErrorIntl?.(error)}
      >
        {children}
      </IntlProvider>
    </AntConfigProvider>
  );
};

export default LocaleProvider;
