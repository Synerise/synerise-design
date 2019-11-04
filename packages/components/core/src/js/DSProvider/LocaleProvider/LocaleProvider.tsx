import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { flatten } from 'flat';
import AntConfigProvider from 'antd/lib/config-provider';
import { MessageFormatElement } from 'intl-messageformat-parser';
import antMessages from './antLocales';

type Messages = Record<string, string> | Record<string, MessageFormatElement[]>;
type NestedMessages = {
  [key: string]: string | NestedMessages;
};

export interface LocaleProviderProps {
  locale?: string; // ex. pl, en-GB
  messages?: NestedMessages;
  timeZone?: string; // Europe/Warsaw
}

const DEFAULT_LANG = 'en-US';

export default class LocaleProvider extends React.Component<LocaleProviderProps> {
  static defaultProps = { locale: DEFAULT_LANG, localeData: {} };

  getLangForCode = (code: string): string => code.substring(0, 2);

  render(): React.ReactNode {
    const { messages, locale, timeZone, children } = this.props;
    const code = locale || DEFAULT_LANG;
    const lang = this.getLangForCode(code);
    const localeData = messages || {};
    const antLocale = Object.prototype.hasOwnProperty.call(antMessages, lang) ? antMessages[lang] : antMessages.default;
    const currentMessages = flatten({ ...(localeData[lang] as NestedMessages) });
    return (
      <AntConfigProvider locale={antLocale}>
        <IntlProvider textComponent="span" locale={code} messages={currentMessages as Messages} timeZone={timeZone}>
          {children}
        </IntlProvider>
      </AntConfigProvider>
    );
  }
}
