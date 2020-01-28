import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { flatten } from 'flat';
import * as merge from 'deepmerge';
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
  defaultMessages?: NestedMessages;
  timeZone?: string; // Europe/Warsaw
}

interface LocaleProviderState {
  dsLocales: NestedMessages;
}

const DEFAULT_LANG = 'en-US';

export default class LocaleProvider extends React.Component<LocaleProviderProps, LocaleProviderState> {
  static defaultProps = { locale: DEFAULT_LANG, localeData: {} };

  state = {
    dsLocales: {},
  };

  componentDidMount(): void {
    const { locale } = this.props;
    const lang = this.getLangForCode(locale || DEFAULT_LANG);
    import(`../../../i18n/${lang}.json`).then(dsLocales =>
      this.setState({
        dsLocales,
      })
    );
  }

  getLangForCode = (code: string): string => code.substring(0, 2);

  render(): React.ReactNode {
    const { defaultMessages = {}, messages = {}, locale, timeZone, children } = this.props;
    const { dsLocales } = this.state;
    const code = locale || DEFAULT_LANG;
    const lang = this.getLangForCode(code);
    const localeData = messages || {};
    const localeDataForLang = localeData[lang] || {};
    const antLocale = Object.prototype.hasOwnProperty.call(antMessages, lang) ? antMessages[lang] : antMessages.default;
    const currentMessages = flatten({
      ...dsLocales,
      ...merge.all([defaultMessages, localeDataForLang as NestedMessages]),
    });
    return (
      <AntConfigProvider locale={antLocale}>
        <IntlProvider textComponent="span" locale={code} messages={currentMessages as Messages} timeZone={timeZone}>
          {children}
        </IntlProvider>
      </AntConfigProvider>
    );
  }
}
