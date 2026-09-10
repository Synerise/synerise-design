import {
  addDays as fnsAddDays,
  addHours as fnsAddHours,
  addMinutes as fnsAddMinutes,
  addMonths as fnsAddMonths,
  addSeconds as fnsAddSeconds,
  addWeeks as fnsAddWeeks,
  addYears as fnsAddYears,
} from 'date-fns';

export default {
  HOURS: fnsAddHours,
  MINUTES: fnsAddMinutes,
  SECONDS: fnsAddSeconds,
  DAYS: fnsAddDays,
  WEEKS: fnsAddWeeks,
  MONTHS: fnsAddMonths,
  YEARS: fnsAddYears,
};
