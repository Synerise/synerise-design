import { format as fnsFormat } from 'date-fns';
import en from 'date-fns/locale/en-GB';
import pl from 'date-fns/locale/pl';
import es from 'date-fns/locale/es';

const locales = {
  en,
  pl,
  es,
};

const defaultLocale = 'en';

const format = (date: Date, formatStr: string, locale: string = defaultLocale): string => {
  return fnsFormat(date, formatStr, {
    locale: locales[locale.substring(0, 2)],
  });
};
export default format;
