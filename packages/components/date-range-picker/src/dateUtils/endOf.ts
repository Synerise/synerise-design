import fnsEndOfHour from "date-fns/endOfHour";
import fnsEndOfMinute from "date-fns/endOfMinute";
import fnsEndOfSecond from "date-fns/endOfSecond";
import fnsEndOfDay from "date-fns/endOfDay";
import fnsEndOfISOWeek from "date-fns/endOfISOWeek";
import fnsEndOfMonth from "date-fns/endOfMonth";
import fnsEndOfYear from "date-fns/endOfYear";

export default {
  HOURS: fnsEndOfHour,
  MINUTES: fnsEndOfMinute,
  SECONDS: fnsEndOfSecond,
  DAYS: fnsEndOfDay,
  WEEKS: fnsEndOfISOWeek,
  MONTHS: fnsEndOfMonth,
  YEARS: fnsEndOfYear,
};
