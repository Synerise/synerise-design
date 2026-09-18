import { isValid as fnsIsValid } from 'date-fns';
import { enGB as en, es, pl } from 'date-fns/locale';

import { fnsFormat } from './fns';

const locales = {
  en,
  pl,
  es,
};

const isLocaleKey = (key: string): key is keyof typeof locales => {
  // biome-ignore lint/suspicious/noPrototypeBuiltins: Object.hasOwn is ES2022 (Safari 15.4+); the DS uses no other ES2022 runtime API, so keep the ES2021 floor
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
