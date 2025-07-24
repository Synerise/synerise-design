import fnsIsValid from 'date-fns/isValid';
import { enGB as en, es, pl } from 'date-fns/locale';

import { fnsFormat } from './fns';

const locales = {
  en,
  pl,
  es,
};

const isLocaleKey = (key: string): key is keyof typeof locales => {
  return Object.prototype.hasOwnProperty.call(locales, key);
};

const defaultLocale = 'en';

export default function (
  date: Date,
  formatStr: string,
  locale = defaultLocale,
): string {
  if (!fnsIsValid(date)) {
    return '';
  }
  const localeKey = locale.substring(0, 2);
  return fnsFormat(date, formatStr, {
    locale: isLocaleKey(localeKey)
      ? locales[localeKey]
      : locales[defaultLocale],
  });
}
