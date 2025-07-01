import fnsStartOfDay from 'date-fns/startOfDay';
import fnsStartOfHour from 'date-fns/startOfHour';
import fnsStartOfISOWeek from 'date-fns/startOfISOWeek';
import fnsStartOfMinute from 'date-fns/startOfMinute';
import fnsStartOfMonth from 'date-fns/startOfMonth';
import fnsStartOfSecond from 'date-fns/startOfSecond';
import fnsStartOfYear from 'date-fns/startOfYear';

export default {
  HOURS: fnsStartOfHour,
  MINUTES: fnsStartOfMinute,
  SECONDS: fnsStartOfSecond,
  DAYS: fnsStartOfDay,
  WEEKS: fnsStartOfISOWeek,
  MONTHS: fnsStartOfMonth,
  YEARS: fnsStartOfYear,
};
