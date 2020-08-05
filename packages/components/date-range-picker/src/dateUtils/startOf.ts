// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfHour from 'date-fns/start_of_hour';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfMinute from 'date-fns/start_of_minute';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfSecond from 'date-fns/start_of_second';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfDay from 'date-fns/start_of_day';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfISOWeek from 'date-fns/start_of_iso_week';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfMonth from 'date-fns/start_of_month';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfISOYear from 'date-fns/start_of_iso_year';

export default {
  HOURS: fnsStartOfHour,
  MINUTES: fnsStartOfMinute,
  SECONDS: fnsStartOfSecond,
  DAYS: fnsStartOfDay,
  WEEKS: fnsStartOfISOWeek,
  MONTHS: fnsStartOfMonth,
  YEARS: fnsStartOfISOYear,
};
