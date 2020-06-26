// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfHour from 'date-fns/end_of_hour';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfMinute from 'date-fns/end_of_minute';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfSecond from 'date-fns/end_of_second';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfDay from 'date-fns/end_of_day';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfISOWeek from 'date-fns/end_of_iso_week';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfMonth from 'date-fns/end_of_month';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfISOYear from 'date-fns/end_of_iso_year';

export default {
  HOURS: fnsEndOfHour,
  MINUTES: fnsEndOfMinute,
  SECONDS: fnsEndOfSecond,
  DAYS: fnsEndOfDay,
  WEEKS: fnsEndOfISOWeek,
  MONTHS: fnsEndOfMonth,
  YEARS: fnsEndOfISOYear,
};
