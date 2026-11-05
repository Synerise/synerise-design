import {
  endOfDay as fnsEndOfDay,
  endOfHour as fnsEndOfHour,
  endOfISOWeek as fnsEndOfISOWeek,
  endOfMinute as fnsEndOfMinute,
  endOfMonth as fnsEndOfMonth,
  endOfSecond as fnsEndOfSecond,
  endOfYear as fnsEndOfYear,
} from 'date-fns';

import type { RelativeUnit } from '../date.types';

export default {
  HOURS: fnsEndOfHour,
  MINUTES: fnsEndOfMinute,
  SECONDS: fnsEndOfSecond,
  DAYS: fnsEndOfDay,
  WEEKS: fnsEndOfISOWeek,
  MONTHS: fnsEndOfMonth,
  YEARS: fnsEndOfYear,
} satisfies Record<RelativeUnit, unknown>;
