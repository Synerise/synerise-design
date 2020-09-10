import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import { legacyParse } from '@date-fns/upgrade/v2';
import { IntlShape } from 'react-intl';
import { DateRange } from './date.types';
import { ABSOLUTE, RELATIVE } from './constants';
import ADD from './dateUtils/add';
import START_OF from './dateUtils/startOf';
import END_OF from './dateUtils/endOf';
import dayjs from 'dayjs';
import 'dayjs/plugin/utc';
import { Texts } from './DateRangePicker.types';

// eslint-disable-next-line import/prefer-default-export
export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: undefined, to: undefined };
  }
  if (range.type === RELATIVE) {
    const { future, offset, duration } = range;
    const now = new Date();
    let left;
    let right;

    if (future) {
      left = ADD[offset.type](START_OF[offset.type](now), offset.value);
      right = ADD[duration.type](END_OF[duration.type](left), duration.value - 1);
    } else {
      right = ADD[offset.type](END_OF[offset.type](now), -offset.value);
      left = ADD[duration.type](START_OF[duration.type](right), 1 - duration.value);
    }

    const from = fnsMin([legacyParse(left), right]);
    const to = fnsMax([legacyParse(left), right]);
    return { ...range, type: RELATIVE, from, to, offset, duration, future };
  }
  const from = range.from ? legacyParse(range.from) : undefined;
  const to = range.to ? legacyParse(range.to) : undefined;
  return { ...range, type: ABSOLUTE, from, to };
};

export const getDefaultTexts = (intl: IntlShape,texts?: Partial<Texts>): Texts => {
  return {
    apply: texts?.apply || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.APPLY` }),
    after: texts?.after || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.AFTER` }),
    allTime: texts?.allTime || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.ALL-TIME` }),
    before:  texts?.before || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.BEFORE` }),
    custom:  texts?.custom || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.CUSTOM` }),
    clear: texts?.clear || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.CLEAR` }),
    days:  texts?.days || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.DAYS` }),
    emptyDateError:  texts?.emptyDateError || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR` }),
    endDate:  texts?.endDate || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.END-DATE` }),
    endDatePlaceholder:  texts?.endDatePlaceholder || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.END-DATE-PLACEHOLDER` }),
    filter:  texts?.filter || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.FILTER` }),
    hours:  texts?.hours || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.HOURS` }),
    last:  texts?.last || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST` }),
    last3Months:  texts?.last3Months || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-3-MONTHS` }),
    last6Months:  texts?.last6Months || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-6-MONTHS` }),
    lastMonth:  texts?.lastMonth || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-MONTH` }),
    lastWeek:  texts?.lastWeek || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-WEEK` }),
    lastYear:  texts?.lastYear || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-YEAR` }),
    last7Days: texts?.last7Days || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-7-DAYS` }),
    minutes:  texts?.minutes || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.MINUTES` }),
    months:  texts?.months || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.MONTHS` }),
    more:  texts?.more || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.MORE` }),
    next:  texts?.next || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT` }),
    next3Months:  texts?.next3Months || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-3-MONTHS` }),
    next6Months:  texts?.next6Months || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-6-MONTHS` }),
    next7Days:  texts?.next7Days || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-7-DAYS` }),
    nextMonth:  texts?.nextMonth || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-MONTH` }),
    nextWeek:  texts?.nextWeek || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-WEEK` }),
    nextYear:  texts?.nextYear || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-YEAR` }),
    now:  texts?.now || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NOW` }),
    relativeDateRange:  texts?.relativeDateRange || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.RELATIVE-DATE-RANGE` }),
    seconds:  texts?.seconds || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.SECONDS` }),
    selectDate:  texts?.selectDate || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.SELECT-DATE` }),
    selectTime:  texts?.selectTime || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.SELECT-TIME` }),
    since:  texts?.since || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.SINCE` }),
    startDate:  texts?.startDate || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.START-DATE` }),
    startDatePlaceholder:  texts?.startDatePlaceholder || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.START-DATE-PLACEHOLDER` }),
    thisMonth:  texts?.thisMonth || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.THIS-MONTH` }),
    thisWeek:  texts?.thisWeek || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.THIS-WEEK` }),
    timestampLast:  texts?.timestampLast || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-LAST` }),
    timestampNext:  texts?.timestampNext || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-NEXT` }),
    timestampTill:  texts?.timestampTill || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-TILL` }),
    today:  texts?.today || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.TODAY` }),
    tomorrow:  texts?.tomorrow || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.TOMORROW` }),
    weeks:  texts?.weeks || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKS` }),
    years:  texts?.years || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.YEARS` }),
    yesterday: texts?.yesterday || intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.YESTERDAY` }),
  };
};


export const formatTime = (seconds: number, format: string = 'HH:mm:ss') => {
  return dayjs.utc(seconds * 1000).format(format);
};
