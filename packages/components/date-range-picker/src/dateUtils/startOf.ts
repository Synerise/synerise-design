// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfHour from 'date-fns/startOfHour';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfMinute from 'date-fns/startOfMinute';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfSecond from 'date-fns/startOfSecond';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfDay from 'date-fns/startOfDay';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfISOWeek from 'date-fns/startOfISOWeek';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfMonth from 'date-fns/startOfMonth';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfISOYear from 'date-fns/startOfISOWeekYear';

export default {
  HOURS: fnsStartOfHour,
  MINUTES: fnsStartOfMinute,
  SECONDS: fnsStartOfSecond,
  DAYS: fnsStartOfDay,
  WEEKS: fnsStartOfISOWeek,
  MONTHS: fnsStartOfMonth,
  YEARS: fnsStartOfISOYear,
};
