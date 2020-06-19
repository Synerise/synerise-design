import * as React from 'react';

const WEEKDAYS_LONG = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  pl: ['Niedziela', 'PoniedziaĹek', 'Wtorek', 'Ĺroda', 'Czwartek', 'PiÄtek', 'obota'],
};

const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  pl: ['N', 'P', 'W', 'Ĺ', 'C', 'P', 'S'],
};

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  pl: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
};

const FIRST_DAY = {
  en: 0,
  pl: 1,
};

function formatDay(d: Date, locale = 'en'): string {
  return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
}

function formatMonthTitle(d: Date, locale = 'en'): string {
  return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
}

function formatWeekdayShort(i: React.ReactText, locale: React.ReactText): string {
  return WEEKDAYS_SHORT[locale][i];
}

function formatWeekdayLong(i: React.ReactText, locale: React.ReactText): string {
  return WEEKDAYS_SHORT[locale][i];
}

function getFirstDayOfWeek(locale: React.ReactText): string {
  return FIRST_DAY[locale];
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
};
