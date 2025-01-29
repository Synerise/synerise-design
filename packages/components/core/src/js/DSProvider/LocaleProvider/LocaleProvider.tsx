import React, { Component, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { OnErrorFn } from '@formatjs/intl';

import { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
import { flatten } from 'flat';
import * as merge from 'deepmerge';
import AntConfigProvider from 'antd/lib/config-provider';
import antMessages from './antLocales';

type IntlMessages = Record<string, string> | Record<string, MessageFormatElement[]>;

type NestedMessages = {
  [key: string]: string | NestedMessages;
};

type onErrorFnParameters = Parameters<OnErrorFn>;
export type LocaleProviderProps = {
  locale?: string;
  defaultLocale?: string;
  messages?: NestedMessages;
  defaultMessages?: NestedMessages;
  timeZone?: string;
  children?: ReactNode;
  onDSLocalesLoaded?: () => void;
  onErrorIntl?: (error: onErrorFnParameters[0], { dsLocalesLoaded }: { dsLocalesLoaded: boolean }) => void;
};

type LocaleProviderState = {
  dsLocales: NestedMessages;
  dsLocalesLoaded: boolean;
};

const DEFAULT_LANG = 'en-US';
const getLangForCode = (code: string): string => code.substring(0, 2);

export default class LocaleProvider extends Component<LocaleProviderProps, LocaleProviderState> {
  static defaultProps = { locale: DEFAULT_LANG, localeData: {} };

  state = {
    dsLocales: {},
    dsLocalesLoaded: false,
  };

  componentDidMount(): void {
    const { locale, onDSLocalesLoaded } = this.props;
    const lang = getLangForCode(locale || DEFAULT_LANG);
    import(`../../../i18n/${lang}.json`).then(dsLocales => {
      this.setState({
        dsLocales,
        dsLocalesLoaded: true,
      });
      // eslint-disable-next-line no-unused-expressions
      onDSLocalesLoaded?.();
    });
  }

  render(): ReactNode {
    const { defaultMessages = {}, messages = {}, locale, defaultLocale, timeZone, children, onErrorIntl } = this.props;
    const { dsLocales, dsLocalesLoaded } = this.state;

    const code = locale || DEFAULT_LANG;
    const lang = getLangForCode(code);
    const localeData = messages || {};
    const localeDataForLang = localeData[lang] || {};
    const antLocale = Object.prototype.hasOwnProperty.call(antMessages, lang) ? antMessages[lang] : antMessages.default;
    const currentMessages: IntlMessages = flatten({
      ...(dsLocales as NestedMessages),
      ...merge.all([defaultMessages, localeDataForLang as NestedMessages]),
    });
    return (
      <AntConfigProvider locale={antLocale}>
        <IntlProvider
          textComponent="span"
          locale={code}
          messages={currentMessages}
          timeZone={timeZone}
          defaultLocale={defaultLocale}
          onError={error => onErrorIntl?.(error, { dsLocalesLoaded })}
        >
          {children}
        </IntlProvider>
      </AntConfigProvider>
    );
  }
}
