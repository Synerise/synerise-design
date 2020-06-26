import subSecond from 'date-fns/sub_seconds';
import subMinute from 'date-fns/sub_minutes';
import subHour from 'date-fns/sub_hours';
import subDay from 'date-fns/sub_days';
import subWeek from 'date-fns/sub_weeks';
import subMonth from 'date-fns/sub_months';
import subYear from 'date-fns/sub_years';

export default {
  SECONDS: subSecond,
  MINUTES: subMinute,
  HOURS: subHour,
  DAYS: subDay,
  WEEKS: subWeek,
  MONTHS: subMonth,
  YEARS: subYear,
};
