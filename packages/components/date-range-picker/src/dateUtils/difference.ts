import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInYears from 'date-fns/differenceInYears';

export default {
  HOURS: differenceInHours,
  MINUTES: differenceInMinutes,
  SECONDS: differenceInSeconds,
  DAYS: differenceInDays,
  WEEKS: differenceInWeeks,
  MONTHS: differenceInMonths,
  YEARS: differenceInYears,
};
