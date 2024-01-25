import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import { legacyParse } from '@date-fns/upgrade/v2';

import { omit } from 'lodash';

import { IntlShape } from 'react-intl';
import { DateRange } from './date.types';
import { ABSOLUTE, CUSTOM_RANGE_KEY, RELATIVE } from './constants';
import ADD from './dateUtils/add';
import START_OF from './dateUtils/startOf';
import END_OF from './dateUtils/endOf';
import { Texts } from './DateRangePicker.types';

export { START_OF, END_OF };

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
        right = ADD[duration.type](offset.value, duration.value);
      } else {
        left = ADD[duration.type](offset.value, -duration.value);
        right = offset.value;
      }
    } else {
      let rightBoundaryRoundingUnit = future ? duration.type : offset.type;

      if (duration.type !== offset.type) {
        const unitGranularityOrder = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'];
        rightBoundaryRoundingUnit =
          unitGranularityOrder.indexOf(duration.type) < unitGranularityOrder.indexOf(offset.type)
            ? duration.type
            : offset.type;
      }
      if (future) {
        left = ADD[offset.type](START_OF[offset.type](now), offset.value);
        right = END_OF[duration.type](ADD[duration.type](left, duration.value - 1));
      } else {
        right = END_OF[rightBoundaryRoundingUnit](ADD[offset.type](now, -offset.value));
        left = ADD[duration.type](START_OF[duration.type](right), 1 - duration.value);
      }
    }

    const from = fnsMin([left, right]);
    const to = fnsMax([left, right]);
    const normalizedRange = { ...range, type: RELATIVE, from, to, offset, duration, future };
    return normalizedRange as DateRange;
  }
  const keys = Object.keys(range);
  const from = range.from ? legacyParse(range.from) : undefined;
  const to = range.to ? legacyParse(range.to) : undefined;
  const dropNonAbsolute = (dateRange: DateRange): DateRange =>
    omit(dateRange, ['offset', 'duration', 'future']) as DateRange;
  const absoluteRange = { ...dropNonAbsolute(range), from, to };
  if (!keys.includes('from') && !keys.includes('to')) {
    absoluteRange.translationKey = 'allTime';
  }
  return absoluteRange;
};

const getIntlMessage = (
  textMessageId: string,
  intl: IntlShape,
  areDefaultTextsDisabled?: boolean,
  defaultMessage?: string
): string => (areDefaultTextsDisabled ? '' : intl.formatMessage({ id: textMessageId, defaultMessage }));

export const getDefaultTexts = (intl: IntlShape, disableDefault?: boolean, texts?: Partial<Texts>): Texts => {
  const defaultTexts = {
    apply: getIntlMessage(`DS.DATE-RANGE-PICKER.APPLY`, intl, disableDefault),
    after: getIntlMessage(`DS.DATE-RANGE-PICKER.AFTER`, intl, disableDefault),
    allTime: getIntlMessage(`DS.DATE-RANGE-PICKER.ALL-TIME`, intl, disableDefault),
    before: getIntlMessage(`DS.DATE-RANGE-PICKER.BEFORE`, intl, disableDefault),
    custom: getIntlMessage(`DS.DATE-RANGE-PICKER.CUSTOM`, intl, disableDefault),
    clear: getIntlMessage(`DS.DATE-RANGE-PICKER.CLEAR`, intl, disableDefault),
    days: getIntlMessage(`DS.DATE-RANGE-PICKER.DAYS`, intl, disableDefault),
    emptyDateError: getIntlMessage(`DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR`, intl, disableDefault),
    endDate: getIntlMessage(`DS.DATE-RANGE-PICKER.END-DATE`, intl, disableDefault),
    endDatePlaceholder: getIntlMessage(`DS.DATE-RANGE-PICKER.END-DATE-PLACEHOLDER`, intl, disableDefault),
    filter: getIntlMessage(`DS.DATE-RANGE-PICKER.FILTER`, intl, disableDefault),
    hours: getIntlMessage(`DS.DATE-RANGE-PICKER.HOURS`, intl, disableDefault),
    last: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST`, intl, disableDefault),
    last3Months: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-3-MONTHS`, intl, disableDefault),
    last6Months: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-6-MONTHS`, intl, disableDefault),
    lastMonth: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-MONTH`, intl, disableDefault),
    lastWeek: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-WEEK`, intl, disableDefault),
    lastYear: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-YEAR`, intl, disableDefault),
    last7Days: getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-7-DAYS`, intl, disableDefault),
    minutes: getIntlMessage(`DS.DATE-RANGE-PICKER.MINUTES`, intl, disableDefault),
    months: getIntlMessage(`DS.DATE-RANGE-PICKER.MONTHS`, intl, disableDefault),
    more: getIntlMessage(`DS.DATE-RANGE-PICKER.MORE`, intl, disableDefault),
    next: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT`, intl, disableDefault),
    next3Months: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-3-MONTHS`, intl, disableDefault),
    next6Months: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-6-MONTHS`, intl, disableDefault),
    next7Days: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-7-DAYS`, intl, disableDefault),
    nextMonth: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-MONTH`, intl, disableDefault),
    nextWeek: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-WEEK`, intl, disableDefault),
    nextYear: getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-YEAR`, intl, disableDefault),
    now: getIntlMessage(`DS.DATE-RANGE-PICKER.NOW`, intl, disableDefault),
    relativeDateRange: getIntlMessage(`DS.DATE-RANGE-PICKER.RELATIVE-DATE-RANGE`, intl, disableDefault),
    seconds: getIntlMessage(`DS.DATE-RANGE-PICKER.SECONDS`, intl, disableDefault),
    selectDate: getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-DATE`, intl, disableDefault),
    selectTime: getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-TIME`, intl, disableDefault),
    since: getIntlMessage(`DS.DATE-RANGE-PICKER.SINCE`, intl, disableDefault),
    startDate: getIntlMessage(`DS.DATE-RANGE-PICKER.START-DATE`, intl, disableDefault),
    startDatePlaceholder: getIntlMessage(`DS.DATE-RANGE-PICKER.START-DATE-PLACEHOLDER`, intl, disableDefault),
    thisMonth: getIntlMessage(`DS.DATE-RANGE-PICKER.THIS-MONTH`, intl, disableDefault),
    thisWeek: getIntlMessage(`DS.DATE-RANGE-PICKER.THIS-WEEK`, intl, disableDefault),
    timestampLast: getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-LAST`, intl, disableDefault),
    timestampNext: getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-NEXT`, intl, disableDefault),
    timestampTill: getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-TILL`, intl, disableDefault),
    today: getIntlMessage(`DS.DATE-RANGE-PICKER.TODAY`, intl, disableDefault),
    tomorrow: getIntlMessage(`DS.DATE-RANGE-PICKER.TOMORROW`, intl, disableDefault),
    weeks: getIntlMessage(`DS.DATE-RANGE-PICKER.WEEKS`, intl, disableDefault),
    years: getIntlMessage(`DS.DATE-RANGE-PICKER.YEARS`, intl, disableDefault),
    yesterday: getIntlMessage(`DS.DATE-RANGE-PICKER.YESTERDAY`, intl, disableDefault),
    pasteRange: getIntlMessage(`DS.DATE-RANGE-PICKER.PASTE-RANGE`, intl, disableDefault),
    clearRange: getIntlMessage(`DS.DATE-RANGE-PICKER.CLEAR-RANGE`, intl, disableDefault, 'Clear range'),
    copyRange: getIntlMessage(`DS.DATE-RANGE-PICKER.COPY-RANGE`, intl, disableDefault, 'Copy range'),
    remove: getIntlMessage(`DS.DATE-RANGE-PICKER.REMOVE`, intl, disableDefault, 'Remove'),
    savedFiltersTrigger: getIntlMessage(`DS.DATE-RANGE-PICKER.SAVED-FILTERS`, intl, disableDefault, 'Saved filters'),
    range: getIntlMessage(`DS.DATE-RANGE-PICKER.RANGE`, intl, disableDefault, 'Range'),
    hour: getIntlMessage(`DS.DATE-RANGE-PICKER.HOUR`, intl, disableDefault, 'Hour'),
    filterEnabled: getIntlMessage(`DS.DATE-RANGE-PICKER.FILTER-ENABLED`, intl, disableDefault, 'Filter enabled'),
    selectDateFilter: getIntlMessage(
      `DS.DATE-RANGE-PICKER.SELECT-DATE-FILTER`,
      intl,
      disableDefault,
      'Select date filter'
    ),
    datesFilter: getIntlMessage(`DS.DATE-RANGE-PICKER.DATES_FILTER`, intl, disableDefault, 'Date filter'),
    cancel: getIntlMessage(`DS.DATE-RANGE-PICKER.CANCEL`, intl, disableDefault, 'Cancel'),
    everyDay: getIntlMessage(`DS.DATE-RANGE-PICKER.EVERY_DAY`, intl, disableDefault, 'Every day'),

    nthDayOfMonth: getIntlMessage(`DS.DATE-RANGE-PICKER.NTH-DAY-OF-MONTH`, intl, disableDefault),
    daysOf: getIntlMessage(`DS.DATE-RANGE-PICKER.DAYS-OF`, intl, disableDefault),
    countedFrom: getIntlMessage(`DS.DATE-RANGE-PICKER.COUNTED-FROM`, intl, disableDefault),
    addRule: getIntlMessage(`DS.DATE-RANGE-PICKER.ADD-RULE`, intl, disableDefault),
    addTime: getIntlMessage(`DS.DATE-RANGE-PICKER.ADD-TIME`, intl, disableDefault, 'Add range'),
    change: getIntlMessage(`DS.DATE-RANGE-PICKER.CHANGE`, intl, disableDefault),
    weekly: getIntlMessage(`DS.DATE-RANGE-PICKER.WEEKLY`, intl, disableDefault),
    monthly: getIntlMessage(`DS.DATE-RANGE-PICKER.MONTHLY`, intl, disableDefault, 'Monthly'),
    daily: getIntlMessage(`DS.DATE-RANGE-PICKER.DAILY`, intl, disableDefault, 'Daily'),
    filterName: getIntlMessage(`DS.DATE-RANGE-PICKER.FILTER-NAME`, intl, disableDefault, 'Filter name'),
    saveFilter: getIntlMessage(`DS.DATE-RANGE-PICKER.SAVE-FILTER`, intl, disableDefault, 'Save filter'),
    selected: getIntlMessage(`DS.DATE-RANGE-PICKER.SELECTED`, intl, disableDefault, 'Selected'),
    selectDaysDescription: getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-DAYS-DESCRIPTION`, intl, disableDefault),
    selectAll: getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-ALL`, intl, disableDefault, 'Select all'),
    unselectAll: getIntlMessage(`DS.DATE-RANGE-PICKER.UNSELECT-ALL`, intl, disableDefault, 'Unselect all'),
    inverseSelection: getIntlMessage(`DS.DATE-RANGE-PICKER.FILTER-INVERSE-SELECTION`, intl, disableDefault),
    setTimeFor: getIntlMessage(`DS.DATE-RANGE-PICKER.SET_TIME_FOR`, intl, disableDefault),
    week: getIntlMessage(`DS.DATE-RANGE-PICKER.IN-WEEK`, intl, disableDefault),
    month: getIntlMessage(`DS.DATE-RANGE-PICKER.IN-MONTH`, intl, disableDefault),
    beginning: getIntlMessage(`DS.DATE-RANGE-PICKER.BEGINNING`, intl, disableDefault),
    ending: getIntlMessage(`DS.DATE-RANGE-PICKER.END`, intl, disableDefault),
    maximumRanges: getIntlMessage(
      'DS.DATE-RANGE-PICKER.MAXIMUM-RANGES-MESSAGE',
      intl,
      disableDefault,
      'The maximum amount of ranges have been selected.'
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
