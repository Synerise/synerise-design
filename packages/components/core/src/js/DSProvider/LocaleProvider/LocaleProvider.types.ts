import type { ReactNode } from 'react';
import type { OnErrorFn } from '@formatjs/intl';
import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';

export type IntlMessages = Record<string, string> | Record<string, MessageFormatElement[]>;

export type NestedMessages = {
  [key: string]: string | NestedMessages;
};

export type onErrorFnParameters = Parameters<OnErrorFn>;

export type LocaleProviderProps = {
  locale?: string;
  defaultLocale?: string;
  messages?: NestedMessages;
  defaultMessages?: NestedMessages;
  timeZone?: string;
  children?: ReactNode;
  onErrorIntl?: (error: onErrorFnParameters[0]) => void;
};
