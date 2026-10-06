import type { ReactNode } from 'react';
import type { MessageFormatElement, ResolvedIntlConfig } from 'react-intl';

export type IntlMessages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export type NestedMessages = {
  [key: string]: string | NestedMessages;
};

export type onErrorFnParameters = Parameters<ResolvedIntlConfig['onError']>;

export type LocaleProviderProps = {
  locale?: string;
  defaultLocale?: string;
  messages?: NestedMessages;
  defaultMessages?: NestedMessages;
  timeZone?: string;
  children?: ReactNode;
  onErrorIntl?: (error: onErrorFnParameters[0]) => void;
};
