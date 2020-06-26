// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsFormat from 'date-fns/format';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import en from 'date-fns/locale/en';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import pl from 'date-fns/locale/pl';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import es from 'date-fns/locale/es';

const locales = {
  en,
  pl,
  es,
};

const defaultLocale = 'en';

const format = (date: Date, formatStr: string, locale: string = defaultLocale): void => {
  return fnsFormat(date, formatStr, {
    locale: locales[locale.substring(0, 2)],
  });
};
export default format;
