import fnsFormat from 'date-fns/format';
import en from 'date-fns/locale/en';
import pl from 'date-fns/locale/pl';
import es from 'date-fns/locale/es';

const locales = {
  en,
  pl,
  es,
};

const defaultLocale = 'en'

export default function(date, formatStr, locale = defaultLocale) {
  return fnsFormat(date, formatStr, {
    locale: locales[locale.substring(0, 2)],
  });
}
