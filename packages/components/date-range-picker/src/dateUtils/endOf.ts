import fnsEndOfHour from 'date-fns/end_of_hour';
import fnsEndOfMinute from 'date-fns/end_of_minute';
import fnsEndOfSecond from 'date-fns/end_of_second';
import fnsEndOfDay from 'date-fns/end_of_day';
import fnsEndOfISOWeek from 'date-fns/end_of_iso_week';
import fnsEndOfMonth from 'date-fns/end_of_month';
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
