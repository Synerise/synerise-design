import AntConfigProvider from 'antd/lib/config-provider';
import * as merge from 'deepmerge';
import { flatten } from 'flat';
import React from 'react';
import { IntlProvider } from 'react-intl';

import {
  type IntlMessages,
  type LocaleProviderProps,
  type NestedMessages,
} from './LocaleProvider.types';
import {
  getAntMessages,
  getDSMessages,
  getLangForCode,
} from './LocaleProvider.utils';

const DEFAULT_LANG = 'en-US';

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

  const antLocale = getAntMessages(lang);
  const dsLocale = getDSMessages(lang);
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
        onError={(error) => onErrorIntl?.(error)}
      >
        {children}
      </IntlProvider>
    </AntConfigProvider>
  );
};

export default LocaleProvider;
