const LOCALES = ['en', 'pl'];
type Locale = (typeof LOCALES)[number];

const WEEKDAYS_LONG: Record<Locale, string[]> = {
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  pl: [
    'Niedziela',
    'PoniedziaĹek',
    'Wtorek',
    'Ĺroda',
    'Czwartek',
    'PiÄtek',
    'obota',
  ],
};

const WEEKDAYS_SHORT: Record<Locale, string[]> = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  pl: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
};

const MONTHS: Record<Locale, string[]> = {
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  pl: [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ],
};

const FIRST_DAY: Record<Locale, number> = {
  en: 0,
  pl: 1,
};

const DEFAULT_LOCALE = 'en';
const DEFAULT_FORMAT = 'MMM DD, YYYY';

const isValidLocale = (locale: string): locale is Locale => {
  return LOCALES.includes(locale);
};

const getValidLocale = (locale: string): Locale =>
  isValidLocale(locale) ? locale : DEFAULT_LOCALE;

function formatDay(
  d: Date,
  _format: string = DEFAULT_FORMAT,
  locale = DEFAULT_LOCALE,
): string {
  return `${WEEKDAYS_LONG[getValidLocale(locale)][d.getDay()]}, ${d.getDate()} ${
    MONTHS[getValidLocale(locale)][d.getMonth()]
  } ${d.getFullYear()}`;
}

function formatMonthTitle(d: Date, locale = DEFAULT_LOCALE): string {
  return `${MONTHS[getValidLocale(locale)][d.getMonth()]} ${d.getFullYear()}`;
}

function formatWeekdayShort(
  i: number,
  locale: string = DEFAULT_LOCALE,
): string {
  return WEEKDAYS_SHORT[getValidLocale(locale)][i];
}

function formatWeekdayLong(
  weekday: number,
  locale: string = DEFAULT_LOCALE,
): string {
  return WEEKDAYS_SHORT[getValidLocale(locale)][weekday];
}

function getFirstDayOfWeek(locale: string = DEFAULT_LOCALE): number {
  return FIRST_DAY[getValidLocale(locale)];
}

/**
 * The locale helpers the calendar needs. Previously a `react-day-picker` v7 `LocaleUtils`
 * object built by spreading `react-day-picker/moment`; v10 has no such concept, so the type is
 * declared here and the moment-derived `formatDate` / `parseDate` / `getMonths` are gone. That
 * spread was also the only thing pulling `moment` into this package, which never declared it.
 *
 * `DayPicker.tsx` adapts these into v10's `formatters` and `labels`.
 */
export type DateLocaleUtils = {
  formatDay: (d: Date, format?: string, locale?: string) => string;
  formatMonthTitle: (d: Date, locale?: string) => string;
  formatWeekdayShort: (i: number, locale?: string) => string;
  formatWeekdayLong: (weekday: number, locale?: string) => string;
  getFirstDayOfWeek: (locale?: string) => number;
};

/**
 * @deprecated Kept for backwards compatibility of the published surface. The calendar no longer
 *   consumes this object directly.
 */
const localeUtils: DateLocaleUtils = {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
};
export default localeUtils;
