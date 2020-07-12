// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInHours from 'date-fns/difference_in_hours';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInDays from 'date-fns/difference_in_days';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInSeconds from 'date-fns/difference_in_seconds';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInWeeks from 'date-fns/difference_in_weeks';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInMonths from 'date-fns/difference_in_months';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInMinutes from 'date-fns/difference_in_minutes';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import differenceInYears from 'date-fns/difference_in_years';

export default {
  HOURS: differenceInHours,
  MINUTES: differenceInMinutes,
  SECONDS: differenceInSeconds,
  DAYS: differenceInDays,
  WEEKS: differenceInWeeks,
  MONTHS: differenceInMonths,
  YEARS: differenceInYears,
};
