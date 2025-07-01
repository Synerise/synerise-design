import type React from 'react';
import MomentLocaleUtils from 'react-day-picker/moment';
import type { LocaleUtils } from 'react-day-picker/types';

const WEEKDAYS_LONG = {
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

const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  pl: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
};

const MONTHS = {
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

const FIRST_DAY = {
  en: 0,
  pl: 1,
};

const DEFAULT_LOCALE = 'en';
const DEFAULT_FORMAT = 'MMM DD, YYYY';

const getValidLocale = (locale: string): string =>
  Object.keys(MONTHS).includes(locale) ? locale : DEFAULT_LOCALE;

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
  i: React.ReactText,
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

const localeUtils: LocaleUtils = {
  ...MomentLocaleUtils,
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
};
export default localeUtils;
