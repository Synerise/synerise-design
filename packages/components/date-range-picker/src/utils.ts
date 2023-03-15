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

const multiplier = {
  SECONDS: 1,
  MINUTES: 60,
  HOURS: 60 * 60,
  DAYS: 60 * 60 * 24,
  WEEKS: 60 * 60 * 24 * 7,
  MONTHS: 60 * 60 * 24 * 30,
  YEARS: 60 * 60 * 24 * 365,
};

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: undefined };
  }
  if (range.type === RELATIVE) {
    const { future, offset, duration } = range;
    const now = new Date();
    let left;
    let right;
    let offsetUnit = offset.type;
    let offsetValue = offset.value;
    let durationUnit = duration.type;
    let durationValue = duration.value;

    if (duration.type !== offset.type) {
      let unitMultiplier;
      // http://docs.terrariumdb.puck.snrstage.com/user-guide/analytical-queries/date-filters/#relative-range
      // The unit that is the base for the rounding is the smaller one among the offset and duration.
      if (multiplier[duration.type] < multiplier[offset.type]) {
        unitMultiplier = multiplier[offset.type] / multiplier[duration.type];
        durationUnit = duration.type;
        durationValue = duration.value;
        offsetUnit = duration.type;
        offsetValue = offset.value * unitMultiplier;
      } else {
        unitMultiplier = multiplier[duration.type] / multiplier[offset.type];
        offsetUnit = offset.type;
        offsetValue = offset.value;
        durationUnit = offset.type;
        durationValue = duration.value * unitMultiplier;
      }
      console.log('was', offset.type, offset.value, duration.type, duration.value);
      console.log('is', offsetUnit, offsetValue, durationUnit, durationValue, unitMultiplier);
    }

    if (offset?.type === 'SINCE') {
      if (future) {
        left = offsetValue;
        right = ADD[durationUnit](offsetValue, durationValue);
      } else {
        left = ADD[durationUnit](offsetValue, -durationValue);
        right = offsetValue;
      }
    } else if (future) {
      left = ADD[offsetUnit](START_OF[offsetUnit](now), offsetValue);
      right = ADD[durationUnit](END_OF[durationUnit](left), durationValue - 1);
    } else {
      right = ADD[offsetUnit](END_OF[offsetUnit](now), -offsetValue);
      left = ADD[durationUnit](START_OF[durationUnit](right), 1 - durationValue);
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
const getIntlMessage = (textMessageId: string, intl: IntlShape, areDefaultTextsDisabled?: boolean): string =>
  areDefaultTextsDisabled ? '' : intl.formatMessage({ id: textMessageId });
export const getDefaultTexts = (intl: IntlShape, disableDefault?: boolean, texts?: Partial<Texts>): Texts => {
  return {
    apply: texts?.apply || getIntlMessage(`DS.DATE-RANGE-PICKER.APPLY`, intl, disableDefault),
    after: texts?.after || getIntlMessage(`DS.DATE-RANGE-PICKER.AFTER`, intl, disableDefault),
    allTime: texts?.allTime || getIntlMessage(`DS.DATE-RANGE-PICKER.ALL-TIME`, intl, disableDefault),
    before: texts?.before || getIntlMessage(`DS.DATE-RANGE-PICKER.BEFORE`, intl, disableDefault),
    custom: texts?.custom || getIntlMessage(`DS.DATE-RANGE-PICKER.CUSTOM`, intl, disableDefault),
    clear: texts?.clear || getIntlMessage(`DS.DATE-RANGE-PICKER.CLEAR`, intl, disableDefault),
    days: texts?.days || getIntlMessage(`DS.DATE-RANGE-PICKER.DAYS`, intl, disableDefault),
    emptyDateError:
      texts?.emptyDateError || getIntlMessage(`DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR`, intl, disableDefault),
    endDate: texts?.endDate || getIntlMessage(`DS.DATE-RANGE-PICKER.END-DATE`, intl, disableDefault),
    endDatePlaceholder:
      texts?.endDatePlaceholder || getIntlMessage(`DS.DATE-RANGE-PICKER.END-DATE-PLACEHOLDER`, intl, disableDefault),
    filter: texts?.filter || getIntlMessage(`DS.DATE-RANGE-PICKER.FILTER`, intl, disableDefault),
    hours: texts?.hours || getIntlMessage(`DS.DATE-RANGE-PICKER.HOURS`, intl, disableDefault),
    last: texts?.last || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST`, intl, disableDefault),
    last3Months: texts?.last3Months || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-3-MONTHS`, intl, disableDefault),
    last6Months: texts?.last6Months || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-6-MONTHS`, intl, disableDefault),
    lastMonth: texts?.lastMonth || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-MONTH`, intl, disableDefault),
    lastWeek: texts?.lastWeek || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-WEEK`, intl, disableDefault),
    lastYear: texts?.lastYear || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-YEAR`, intl, disableDefault),
    last7Days: texts?.last7Days || getIntlMessage(`DS.DATE-RANGE-PICKER.LAST-7-DAYS`, intl, disableDefault),
    minutes: texts?.minutes || getIntlMessage(`DS.DATE-RANGE-PICKER.MINUTES`, intl, disableDefault),
    months: texts?.months || getIntlMessage(`DS.DATE-RANGE-PICKER.MONTHS`, intl, disableDefault),
    more: texts?.more || getIntlMessage(`DS.DATE-RANGE-PICKER.MORE`, intl, disableDefault),
    next: texts?.next || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT`, intl, disableDefault),
    next3Months: texts?.next3Months || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-3-MONTHS`, intl, disableDefault),
    next6Months: texts?.next6Months || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-6-MONTHS`, intl, disableDefault),
    next7Days: texts?.next7Days || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-7-DAYS`, intl, disableDefault),
    nextMonth: texts?.nextMonth || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-MONTH`, intl, disableDefault),
    nextWeek: texts?.nextWeek || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-WEEK`, intl, disableDefault),
    nextYear: texts?.nextYear || getIntlMessage(`DS.DATE-RANGE-PICKER.NEXT-YEAR`, intl, disableDefault),
    now: texts?.now || getIntlMessage(`DS.DATE-RANGE-PICKER.NOW`, intl, disableDefault),
    relativeDateRange:
      texts?.relativeDateRange || getIntlMessage(`DS.DATE-RANGE-PICKER.RELATIVE-DATE-RANGE`, intl, disableDefault),
    seconds: texts?.seconds || getIntlMessage(`DS.DATE-RANGE-PICKER.SECONDS`, intl, disableDefault),
    selectDate: texts?.selectDate || getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-DATE`, intl, disableDefault),
    selectTime: texts?.selectTime || getIntlMessage(`DS.DATE-RANGE-PICKER.SELECT-TIME`, intl, disableDefault),
    since: texts?.since || getIntlMessage(`DS.DATE-RANGE-PICKER.SINCE`, intl, disableDefault),
    startDate: texts?.startDate || getIntlMessage(`DS.DATE-RANGE-PICKER.START-DATE`, intl, disableDefault),
    startDatePlaceholder:
      texts?.startDatePlaceholder ||
      getIntlMessage(`DS.DATE-RANGE-PICKER.START-DATE-PLACEHOLDER`, intl, disableDefault),
    thisMonth: texts?.thisMonth || getIntlMessage(`DS.DATE-RANGE-PICKER.THIS-MONTH`, intl, disableDefault),
    thisWeek: texts?.thisWeek || getIntlMessage(`DS.DATE-RANGE-PICKER.THIS-WEEK`, intl, disableDefault),
    timestampLast: texts?.timestampLast || getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-LAST`, intl, disableDefault),
    timestampNext: texts?.timestampNext || getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-NEXT`, intl, disableDefault),
    timestampTill: texts?.timestampTill || getIntlMessage(`DS.DATE-RANGE-PICKER.TIMESTAMP-TILL`, intl, disableDefault),
    today: texts?.today || getIntlMessage(`DS.DATE-RANGE-PICKER.TODAY`, intl, disableDefault),
    tomorrow: texts?.tomorrow || getIntlMessage(`DS.DATE-RANGE-PICKER.TOMORROW`, intl, disableDefault),
    weeks: texts?.weeks || getIntlMessage(`DS.DATE-RANGE-PICKER.WEEKS`, intl, disableDefault),
    years: texts?.years || getIntlMessage(`DS.DATE-RANGE-PICKER.YEARS`, intl, disableDefault),
    yesterday: texts?.yesterday || getIntlMessage(`DS.DATE-RANGE-PICKER.YESTERDAY`, intl, disableDefault),
    pasteRange: texts?.pasteRange || getIntlMessage(`DS.DATE-RANGE-PICKER.PASTE-RANGE`, intl, disableDefault),
    clearRange: texts?.clearRange || getIntlMessage(`DS.DATE-RANGE-PICKER.CLEAR-RANGE`, intl, disableDefault),
    copyRange: texts?.copyRange || getIntlMessage(`DS.DATE-RANGE-PICKER.COPY-RANGE`, intl, disableDefault),
    remove: texts?.remove || getIntlMessage(`DS.DATE-RANGE-PICKER.REMOVE`, intl, disableDefault),
    savedFiltersTrigger:
      texts?.savedFiltersTrigger || getIntlMessage(`DS.DATE-RANGE-PICKER.SAVED-FILTERS`, intl, disableDefault),
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
