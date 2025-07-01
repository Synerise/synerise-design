import fnsFormat from 'date-fns/format';
import fnsIsValid from 'date-fns/isValid';
import { enGB as en, es, pl } from 'date-fns/locale';

import { convertTokens, legacyParse } from '@date-fns/upgrade/v2';

const locales = {
  en,
  pl,
  es,
};

const defaultLocale = 'en';

const format = (
  date: Date,
  formatStr: string,
  locale: string = defaultLocale,
): string => {
  if (!fnsIsValid(date)) {
    return '';
  }
  return fnsFormat(legacyParse(date), convertTokens(formatStr), {
    locale: locales[locale.substring(0, 2)],
  });
};
export default format;
