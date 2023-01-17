import React from 'react'
import { DSProvider } from '@synerise/ds-core'

export const parameters = {
  layout: 'centered',
};

const withDSProvider = (storyFn) => {
  /**
   * allows overwriting the default language in storybook with localeStorage entry
   * window.localeStorage.setItem('lang', 'en')
   */
  const optionalUserDefinedLocale = localStorage.getItem('lang')
  const props = {
    code: 'en_GB',
    ...optionalUserDefinedLocale ? { locale: optionalUserDefinedLocale } : {},
  } // as DSProviderProps
  return React.createElement(DSProvider, props, storyFn());
}

export const decorators = [
  withDSProvider,
];
