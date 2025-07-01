import subDay from 'date-fns/subDays';
import subHour from 'date-fns/subHours';
import subMinute from 'date-fns/subMinutes';
import subMonth from 'date-fns/subMonths';
import subSecond from 'date-fns/subSeconds';
import subWeek from 'date-fns/subWeeks';
import subYear from 'date-fns/subYears';

export default {
  SECONDS: subSecond,
  MINUTES: subMinute,
  HOURS: subHour,
  DAYS: subDay,
  WEEKS: subWeek,
  MONTHS: subMonth,
  YEARS: subYear,
};
