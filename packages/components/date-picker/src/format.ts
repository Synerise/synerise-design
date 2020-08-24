import { pl, es, enGB as en } from 'date-fns/locale';
import { fnsFormat } from './fns';

const locales = {
  en,
  pl,
  es,
};

const defaultLocale = 'en';

export default function(date: Date, formatStr: string, locale = defaultLocale): string {
  return fnsFormat(date, formatStr, {
    locale: locales[locale.substring(0, 2)],
  });
}
