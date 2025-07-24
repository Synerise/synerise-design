import { getTimezoneOffset } from 'date-fns-tz';
import fnsMax from 'date-fns/max';
import fnsMin from 'date-fns/min';
import { omit } from 'lodash';
import { type IntlShape } from 'react-intl';

import { type Texts } from './DateRangePicker.types';
import { ABSOLUTE, CUSTOM_RANGE_KEY, RELATIVE } from './constants';
import { type DateRange } from './date.types';
import ADD from './dateUtils/add';
import END_OF from './dateUtils/endOf';
import START_OF from './dateUtils/startOf';

export { START_OF, END_OF };

const rmvTZOffset = (dateString: string | Date) => {
  const date = dateString.toString();
  const finalDate = date.replace(/[+-]\d\d:\d\d$/, '');

  return finalDate;
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) {
    return new Date(date).toISOString();
  }

  const timeZoneOffset = getTimezoneOffset(timeZone, date);
  const dif = timeZoneOffset >= 0 ? '+' : '-';

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}${dif}${pad(Math.floor(Math.abs(timeZoneOffset) / 60 / 60 / 1000))}:${pad(
    Math.abs(timeZoneOffset) % 60,
  )}`;
}

export function toIsoStringWithoutZone(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`;
}

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: undefined };
  }
  if (range.type === RELATIVE) {
    const { future, offset, duration } = range;
    const now = new Date();
    let left;
    let right;

    if (offset?.type === 'SINCE') {
      if (future) {
        left = offset.value;
        right = ADD[duration.type as keyof typeof ADD](
          offset.value,
          duration.value,
        );
      } else {
        left = ADD[duration.type as keyof typeof ADD](
          offset.value,
          -duration.value,
        );
        right = offset.value;
      }
    } else {
      let rightBoundaryRoundingUnit = future ? duration.type : offset.type;

      if (duration.type !== offset.type) {
        const unitGranularityOrder = [
          'SECONDS',
          'MINUTES',
          'HOURS',
          'DAYS',
          'WEEKS',
          'MONTHS',
          'YEARS',
        ];
        rightBoundaryRoundingUnit =
          unitGranularityOrder.indexOf(duration.type) <
          unitGranularityOrder.indexOf(offset.type)
            ? duration.type
            : offset.type;
      }
      if (future) {
        left = ADD[offset.type](START_OF[offset.type](now), offset.value);
        right = END_OF[duration.type as keyof typeof END_OF](
          ADD[duration.type as keyof typeof ADD](left, duration.value - 1),
        );
      } else {
        right = END_OF[rightBoundaryRoundingUnit as keyof typeof END_OF](
          ADD[offset.type](now, -offset.value),
        );
        left = ADD[duration.type as keyof typeof ADD](
          START_OF[duration.type as keyof typeof START_OF](right),
          1 - duration.value,
        );
      }
    }

    const from = fnsMin([left, right]);
    const to = fnsMax([left, right]);
    const normalizedRange = {
      ...range,
      type: RELATIVE,
      from,
      to,
      offset,
      duration,
      future,
    };
    return normalizedRange as DateRange;
  }
  const keys = Object.keys(range);
  const dropNonAbsolute = (dateRange: DateRange): DateRange =>
    omit(dateRange, ['offset', 'duration', 'future']) as DateRange;
  const absoluteRange = {
    ...dropNonAbsolute(range),
    from: range.from ? new Date(rmvTZOffset(range?.from)) : undefined,
    to: range.to ? new Date(rmvTZOffset(range?.to)) : undefined,
  };

  if (!keys.includes('from') && !keys.includes('to')) {
    absoluteRange.translationKey = 'allTime';
  }

  return absoluteRange;
};

const getIntlMessage = (
  textMessageId: string,
  intl: IntlShape,
  areDefaultTextsDisabled?: boolean,
  defaultMessage?: string,
): string =>
  areDefaultTextsDisabled
    ? ''
    : intl.formatMessage({ id: textMessageId, defaultMessage });

export const getDefaultTexts = (
  intl: IntlShape,
  disableDefault?: boolean,
  texts?: Partial<Texts>,
): Texts => {
  const defaultTexts = {
    apply: getIntlMessage(
      `DS.DATE-RANGE-PICKER.APPLY`,
      intl,
      disableDefault,
      'Apply',
    ),
    after: getIntlMessage(
      `DS.DATE-RANGE-PICKER.AFTER`,
      intl,
      disableDefault,
      'After',
    ),
    allTime: getIntlMessage(
      `DS.DATE-RANGE-PICKER.ALL-TIME`,
      intl,
      disableDefault,
      'Lifetime',
    ),
    before: getIntlMessage(
      `DS.DATE-RANGE-PICKER.BEFORE`,
      intl,
      disableDefault,
      'Before',
    ),
    custom: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CUSTOM`,
      intl,
      disableDefault,
      'Custom',
    ),
    clear: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CLEAR`,
      intl,
      disableDefault,
      'Clear',
    ),
    clickToSelect: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CLICK-TO-SELECT`,
      intl,
      disableDefault,
      'Click to select',
    ),
    days: getIntlMessage(
      `DS.DATE-RANGE-PICKER.DAYS`,
      intl,
      disableDefault,
      'days',
    ),
    emptyDateError: getIntlMessage(
      `DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR`,
      intl,
      disableDefault,
      'Date cannot be empty',
    ),
    endDate: getIntlMessage(
      `DS.DATE-RANGE-PICKER.END-DATE`,
      intl,
      disableDefault,
      'End date',
    ),
    endDatePlaceholder: getIntlMessage(
      `DS.DATE-RANGE-PICKER.END-DATE-PLACEHOLDER`,
      intl,
      disableDefault,
      'End date',
    ),
    filter: getIntlMessage(
      `DS.DATE-RANGE-PICKER.FILTER`,
      intl,
      disableDefault,
      'Filter',
    ),
    hours: getIntlMessage(
      `DS.DATE-RANGE-PICKER.HOURS`,
      intl,
      disableDefault,
      'Hours',
    ),
    last: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST`,
      intl,
      disableDefault,
      'Last',
    ),
    last3Months: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-3-MONTHS`,
      intl,
      disableDefault,
      'Last 3 months',
    ),
    last6Months: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-6-MONTHS`,
      intl,
      disableDefault,
      'Last 6 months',
    ),
    lastMonth: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-MONTH`,
      intl,
      disableDefault,
      'Last month',
    ),
    lastWeek: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-WEEK`,
      intl,
      disableDefault,
      'Last week',
    ),
    lastYear: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-YEAR`,
      intl,
      disableDefault,
      'Last year',
    ),
    last7Days: getIntlMessage(
      `DS.DATE-RANGE-PICKER.LAST-7-DAYS`,
      intl,
      disableDefault,
      'Last 7 days',
    ),
    minutes: getIntlMessage(
      `DS.DATE-RANGE-PICKER.MINUTES`,
      intl,
      disableDefault,
      'Minutes',
    ),
    months: getIntlMessage(
      `DS.DATE-RANGE-PICKER.MONTHS`,
      intl,
      disableDefault,
      'Months',
    ),
    more: getIntlMessage(
      `DS.DATE-RANGE-PICKER.MORE`,
      intl,
      disableDefault,
      'More',
    ),
    next: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT`,
      intl,
      disableDefault,
      'Next',
    ),
    next3Months: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-3-MONTHS`,
      intl,
      disableDefault,
      'Next 3 months',
    ),
    next6Months: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-6-MONTHS`,
      intl,
      disableDefault,
      'Next 6 months',
    ),
    next7Days: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-7-DAYS`,
      intl,
      disableDefault,
      'Next 7 days',
    ),
    nextMonth: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-MONTH`,
      intl,
      disableDefault,
      'Next month',
    ),
    nextWeek: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-WEEK`,
      intl,
      disableDefault,
      'Next week',
    ),
    nextYear: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NEXT-YEAR`,
      intl,
      disableDefault,
      'Next year',
    ),
    now: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NOW`,
      intl,
      disableDefault,
      'Now',
    ),
    relativeDateRange: getIntlMessage(
      `DS.DATE-RANGE-PICKER.RELATIVE-DATE-RANGE`,
      intl,
      disableDefault,
      'Relative date range',
    ),
    seconds: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SECONDS`,
      intl,
      disableDefault,
      'Seconds',
    ),
    selectDate: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-DATE`,
      intl,
      disableDefault,
      'Select date',
    ),
    selectTime: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-TIME`,
      intl,
      disableDefault,
      'Select time',
    ),
    since: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SINCE`,
      intl,
      disableDefault,
      'Since',
    ),
    startDate: getIntlMessage(
      `DS.DATE-RANGE-PICKER.START-DATE`,
      intl,
      disableDefault,
      'Start date',
    ),
    startDatePlaceholder: getIntlMessage(
      `DS.DATE-RANGE-PICKER.START-DATE-PLACEHOLDER`,
      intl,
      disableDefault,
      'Start date',
    ),
    thisMonth: getIntlMessage(
      `DS.DATE-RANGE-PICKER.THIS-MONTH`,
      intl,
      disableDefault,
      'This month',
    ),
    thisWeek: getIntlMessage(
      `DS.DATE-RANGE-PICKER.THIS-WEEK`,
      intl,
      disableDefault,
      'This week',
    ),
    timestampLast: getIntlMessage(
      `DS.DATE-RANGE-PICKER.TIMESTAMP-LAST`,
      intl,
      disableDefault,
      'Last',
    ),
    timestampNext: getIntlMessage(
      `DS.DATE-RANGE-PICKER.TIMESTAMP-NEXT`,
      intl,
      disableDefault,
      'Next',
    ),
    timestampTill: getIntlMessage(
      `DS.DATE-RANGE-PICKER.TIMESTAMP-TILL`,
      intl,
      disableDefault,
      'Until',
    ),
    today: getIntlMessage(
      `DS.DATE-RANGE-PICKER.TODAY`,
      intl,
      disableDefault,
      'Today',
    ),
    tomorrow: getIntlMessage(
      `DS.DATE-RANGE-PICKER.TOMORROW`,
      intl,
      disableDefault,
      'Tomorrow',
    ),
    weeks: getIntlMessage(
      `DS.DATE-RANGE-PICKER.WEEKS`,
      intl,
      disableDefault,
      'Weeks',
    ),
    years: getIntlMessage(
      `DS.DATE-RANGE-PICKER.YEARS`,
      intl,
      disableDefault,
      'Years',
    ),
    yesterday: getIntlMessage(
      `DS.DATE-RANGE-PICKER.YESTERDAY`,
      intl,
      disableDefault,
      'Yesterday',
    ),
    pasteRange: getIntlMessage(
      `DS.DATE-RANGE-PICKER.PASTE-RANGE`,
      intl,
      disableDefault,
      'Paste range',
    ),
    clearRange: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CLEAR-RANGE`,
      intl,
      disableDefault,
      'Clear range',
    ),
    copyRange: getIntlMessage(
      `DS.DATE-RANGE-PICKER.COPY-RANGE`,
      intl,
      disableDefault,
      'Copy range',
    ),
    remove: getIntlMessage(
      `DS.DATE-RANGE-PICKER.REMOVE`,
      intl,
      disableDefault,
      'Remove',
    ),
    savedFiltersTrigger: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SAVED-FILTERS`,
      intl,
      disableDefault,
      'Saved filters',
    ),
    range: getIntlMessage(
      `DS.DATE-RANGE-PICKER.RANGE`,
      intl,
      disableDefault,
      'Range',
    ),
    hour: getIntlMessage(
      `DS.DATE-RANGE-PICKER.HOUR`,
      intl,
      disableDefault,
      'Hour',
    ),
    filterEnabled: getIntlMessage(
      `DS.DATE-RANGE-PICKER.FILTER-ENABLED`,
      intl,
      disableDefault,
      'Filter enabled',
    ),
    selectDateFilter: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-DATE-FILTER`,
      intl,
      disableDefault,
      'Select date filter',
    ),
    datesFilter: getIntlMessage(
      `DS.DATE-RANGE-PICKER.DATES_FILTER`,
      intl,
      disableDefault,
      'Date filter',
    ),
    cancel: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CANCEL`,
      intl,
      disableDefault,
      'Cancel',
    ),
    everyDay: getIntlMessage(
      `DS.DATE-RANGE-PICKER.EVERY_DAY`,
      intl,
      disableDefault,
      'Every day',
    ),
    nthDayOfMonth: getIntlMessage(
      `DS.DATE-RANGE-PICKER.NTH-DAY-OF-MONTH`,
      intl,
      disableDefault,
      'Day of month',
    ),
    daysOf: getIntlMessage(
      `DS.DATE-RANGE-PICKER.DAYS-OF`,
      intl,
      disableDefault,
      'Days of',
    ),
    countedFrom: getIntlMessage(
      `DS.DATE-RANGE-PICKER.COUNTED-FROM`,
      intl,
      disableDefault,
      'Counted from',
    ),
    addRule: getIntlMessage(
      `DS.DATE-RANGE-PICKER.ADD-RULE`,
      intl,
      disableDefault,
      'Add rule',
    ),
    addTime: getIntlMessage(
      `DS.DATE-RANGE-PICKER.ADD-TIME`,
      intl,
      disableDefault,
      'Add range',
    ),
    change: getIntlMessage(
      `DS.DATE-RANGE-PICKER.CHANGE`,
      intl,
      disableDefault,
      'Change',
    ),
    weekly: getIntlMessage(
      `DS.DATE-RANGE-PICKER.WEEKLY`,
      intl,
      disableDefault,
      'Weekly',
    ),
    monthly: getIntlMessage(
      `DS.DATE-RANGE-PICKER.MONTHLY`,
      intl,
      disableDefault,
      'Monthly',
    ),
    daily: getIntlMessage(
      `DS.DATE-RANGE-PICKER.DAILY`,
      intl,
      disableDefault,
      'Daily',
    ),
    filterName: getIntlMessage(
      `DS.DATE-RANGE-PICKER.FILTER-NAME`,
      intl,
      disableDefault,
      'Filter name',
    ),
    saveFilter: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SAVE-FILTER`,
      intl,
      disableDefault,
      'Save filter',
    ),
    selected: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECTED`,
      intl,
      disableDefault,
      'Selected',
    ),
    selectDaysDescription: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-DAYS-DESCRIPTION`,
      intl,
      disableDefault,
      'Select days',
    ),
    selectAll: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-ALL`,
      intl,
      disableDefault,
      'Select all',
    ),
    unselectAll: getIntlMessage(
      `DS.DATE-RANGE-PICKER.UNSELECT-ALL`,
      intl,
      disableDefault,
      'Unselect all',
    ),
    inverseSelection: getIntlMessage(
      `DS.DATE-RANGE-PICKER.FILTER-INVERSE-SELECTION`,
      intl,
      disableDefault,
      'Inverse',
    ),
    setTimeFor: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SET_TIME_FOR`,
      intl,
      disableDefault,
      'Set time for',
    ),
    week: getIntlMessage(
      `DS.DATE-RANGE-PICKER.IN-WEEK`,
      intl,
      disableDefault,
      'Week',
    ),
    month: getIntlMessage(
      `DS.DATE-RANGE-PICKER.IN-MONTH`,
      intl,
      disableDefault,
      'Month',
    ),
    beginning: getIntlMessage(
      `DS.DATE-RANGE-PICKER.BEGINNING`,
      intl,
      disableDefault,
      'Beginning',
    ),
    ending: getIntlMessage(
      `DS.DATE-RANGE-PICKER.END`,
      intl,
      disableDefault,
      'Ending',
    ),
    maximumRanges: getIntlMessage(
      'DS.DATE-RANGE-PICKER.MAXIMUM-RANGES-MESSAGE',
      intl,
      disableDefault,
      'The maximum amount of ranges have been selected.',
    ),
  };

  return {
    ...defaultTexts,
    ...texts,
  };
};

export const DEFAULT_RANGE = normalizeRange({
  key: undefined,
  translationKey: CUSTOM_RANGE_KEY,
  to: undefined,
  from: undefined,
  type: 'RELATIVE',
  offset: { value: 0, type: 'DAYS' },
  duration: { value: 30, type: 'DAYS' },
});
