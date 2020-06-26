import fnsStartOfHour from 'date-fns/start_of_hour';
import fnsStartOfMinute from 'date-fns/start_of_minute';
import fnsStartOfSecond from 'date-fns/start_of_second';
import fnsStartOfDay from 'date-fns/start_of_day';
import fnsStartOfISOWeek from 'date-fns/start_of_iso_week';
import fnsStartOfMonth from 'date-fns/start_of_month';
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
