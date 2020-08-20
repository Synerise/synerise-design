import en from 'date-fns/locale/en-GB';
import pl from 'date-fns/locale/pl';
import es from 'date-fns/locale/es';
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
