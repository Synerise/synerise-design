// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import en from "date-fns/locale";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import pl from "date-fns/locale";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import es from "date-fns/locale";
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
