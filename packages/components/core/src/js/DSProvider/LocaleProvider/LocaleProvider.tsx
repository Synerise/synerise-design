import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { default as AntConfigProvider } from 'antd/lib/config-provider';

import { MessageFormatElement } from 'intl-messageformat-parser';
type Messages = Record<string, string> | Record<string, MessageFormatElement[]>;

export interface LocaleProviderProps {
  locale?: string; // ex. en_GB/pl_PL
  code: string; // ex. en/pl
  messages?: {
    [key: string]: {
      [key: string]: string;
    };
  };
  timeZone?: string; // Europe/Warsaw
}

const DEFAULT_LANG = 'en';

export class LocaleProvider extends React.Component<LocaleProviderProps> {
  antMessages: any;
  constructor(props) {
    super(props);
    this.antMessages = import(`antd/lib/locale/${props.code}`);
  }

  static defaultProps = {
    locale: DEFAULT_LANG,
    localeData: {},
  };

  render() {
    const localeData = this.props.messages || {};
    const locale = this.props.locale || DEFAULT_LANG;
    const antLocale = this.antMessages;
    const messages = {
      ...localeData[locale],
    };
    return (
      <AntConfigProvider locale={antLocale}>
        <IntlProvider
          textComponent="span"
          locale={locale}
          messages={messages as Messages}
          timeZone={this.props.timeZone}
        >
          {this.props.children}
        </IntlProvider>
      </AntConfigProvider>
    );
  }
}
