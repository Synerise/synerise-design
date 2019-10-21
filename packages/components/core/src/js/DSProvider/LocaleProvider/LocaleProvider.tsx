import * as React from 'react';
import { IntlProvider } from 'react-intl';
import {flatten} from 'flat';
import AntConfigProvider from 'antd/lib/config-provider';
import { MessageFormatElement } from 'intl-messageformat-parser';

type Messages = Record<string, string> | Record<string, MessageFormatElement[]>;
type NestedMessages = {
  [key: string]: string | NestedMessages;
};

export interface LocaleProviderProps {
  locale?: string; // ex. en_GB/pl_PL
  code: string; // ex. en/pl
  messages?: NestedMessages;
  timeZone?: string; // Europe/Warsaw
}

const DEFAULT_LANG = 'en';

export default class LocaleProvider extends React.Component<LocaleProviderProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  antMessages: any;

  static defaultProps = { locale: DEFAULT_LANG, localeData: {} };

  constructor(props: LocaleProviderProps) {
    super(props);
    this.antMessages = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      pl_PL: import(`antd/lib/locale/pl_PL`),
      default: import(`antd/lib/locale/en_US`),
    };
  }

  render(): React.ReactNode {
    const { messages, locale, code, timeZone, children } = this.props;
    const localeData = messages || {};
    const currentLocale = locale || DEFAULT_LANG;
    const antLocale = Object.prototype.hasOwnProperty.call(this.antMessages, code)
      ? this.antMessages[code]
      : this.antMessages.default;
    const currentMessages = flatten({ ...(localeData[currentLocale] as NestedMessages) });
    return (
      <AntConfigProvider locale={antLocale}>
        <IntlProvider
          textComponent="span"
          locale={currentLocale}
          messages={currentMessages as Messages}
          timeZone={timeZone}
        >
          {children}
        </IntlProvider>
      </AntConfigProvider>
    );
  }
}
