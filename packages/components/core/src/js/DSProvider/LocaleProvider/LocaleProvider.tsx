import * as merge from 'deepmerge';
import { flatten } from 'flat';
import React from 'react';
import { IntlProvider } from 'react-intl';

import {
  type IntlMessages,
  type LocaleProviderProps,
  type NestedMessages,
} from './LocaleProvider.types';
import { getDSMessages, getLangForCode } from './LocaleProvider.utils';

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

  const dsLocale = getDSMessages(lang);
  const localeData = messages[lang] || {};
  const currentMessages: IntlMessages = flatten({
    ...dsLocale,
    ...merge.all([defaultMessages, localeData as NestedMessages]),
  });

  return (
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
  );
};

export default LocaleProvider;
