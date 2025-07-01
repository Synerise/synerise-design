import fnsEndOfDay from 'date-fns/endOfDay';
import fnsEndOfHour from 'date-fns/endOfHour';
import fnsEndOfISOWeek from 'date-fns/endOfISOWeek';
import fnsEndOfMinute from 'date-fns/endOfMinute';
import fnsEndOfMonth from 'date-fns/endOfMonth';
import fnsEndOfSecond from 'date-fns/endOfSecond';
import fnsEndOfYear from 'date-fns/endOfYear';

export default {
  HOURS: fnsEndOfHour,
  MINUTES: fnsEndOfMinute,
  SECONDS: fnsEndOfSecond,
  DAYS: fnsEndOfDay,
  WEEKS: fnsEndOfISOWeek,
  MONTHS: fnsEndOfMonth,
  YEARS: fnsEndOfYear,
};
