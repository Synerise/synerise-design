// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import en from 'date-fns/locale/en';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import pl from 'date-fns/locale/pl';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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
