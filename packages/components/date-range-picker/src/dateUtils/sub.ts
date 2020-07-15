// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subSecond from 'date-fns/sub_seconds';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subMinute from 'date-fns/sub_minutes';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subHour from 'date-fns/sub_hours';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subDay from 'date-fns/sub_days';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subWeek from 'date-fns/sub_weeks';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import subMonth from 'date-fns/sub_months';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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
