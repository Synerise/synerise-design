import {
  addDays as fnsAddDays,
  addHours as fnsAddHours,
  addMinutes as fnsAddMinutes,
  addMonths as fnsAddMonths,
  addSeconds as fnsAddSeconds,
  addWeeks as fnsAddWeeks,
  addYears as fnsAddYears,
} from 'date-fns';

import type { RelativeUnit } from '../date.types';

export default {
  HOURS: fnsAddHours,
  MINUTES: fnsAddMinutes,
  SECONDS: fnsAddSeconds,
  DAYS: fnsAddDays,
  WEEKS: fnsAddWeeks,
  MONTHS: fnsAddMonths,
  YEARS: fnsAddYears,
} satisfies Record<RelativeUnit, unknown>;
