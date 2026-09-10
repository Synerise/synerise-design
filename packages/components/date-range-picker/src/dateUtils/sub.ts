import {
  subDays as subDay,
  subHours as subHour,
  subMinutes as subMinute,
  subMonths as subMonth,
  subSeconds as subSecond,
  subWeeks as subWeek,
  subYears as subYear,
} from 'date-fns';

export default {
  SECONDS: subSecond,
  MINUTES: subMinute,
  HOURS: subHour,
  DAYS: subDay,
  WEEKS: subWeek,
  MONTHS: subMonth,
  YEARS: subYear,
};
