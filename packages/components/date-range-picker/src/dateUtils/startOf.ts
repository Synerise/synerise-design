import {
  startOfDay as fnsStartOfDay,
  startOfHour as fnsStartOfHour,
  startOfISOWeek as fnsStartOfISOWeek,
  startOfMinute as fnsStartOfMinute,
  startOfMonth as fnsStartOfMonth,
  startOfSecond as fnsStartOfSecond,
  startOfYear as fnsStartOfYear,
} from 'date-fns';

import type { RelativeUnit } from '../date.types';

export default {
  HOURS: fnsStartOfHour,
  MINUTES: fnsStartOfMinute,
  SECONDS: fnsStartOfSecond,
  DAYS: fnsStartOfDay,
  WEEKS: fnsStartOfISOWeek,
  MONTHS: fnsStartOfMonth,
  YEARS: fnsStartOfYear,
} satisfies Record<RelativeUnit, unknown>;
