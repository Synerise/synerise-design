import dayjs from 'dayjs';

import { type UnitConfig } from '../Unit';
import {
  AM,
  HOUR,
  HOUR_12,
  MAP_12_AM_TO_24_HOUR,
  MAP_12_PM_TO_24_HOUR,
  PM,
} from '../constants/timePicker.constants';

export const handleTimeChange = (
  value: Date | undefined,
  unit: dayjs.UnitType | undefined,
  newValue: number | undefined,
  clockModeChanged = false,
  use12HourClock: boolean | undefined,
  clockMode: string,
  unitConfig: UnitConfig[],
): Date => {
  const wasUndefined = value === undefined;
  let dateBuilder = dayjs(value);

  if (unit) {
    // @ts-expect-error - `unit` const maps to dayjs method
    dateBuilder = dateBuilder[unit](newValue);
  }

  let hourToMap = dateBuilder.get(HOUR);
  if (use12HourClock) {
    hourToMap =
      clockMode === AM
        ? MAP_12_AM_TO_24_HOUR[hourToMap as keyof typeof MAP_12_AM_TO_24_HOUR]
        : MAP_12_PM_TO_24_HOUR[hourToMap as keyof typeof MAP_12_PM_TO_24_HOUR];
    if (unit === HOUR || clockModeChanged) {
      dateBuilder = dateBuilder.set(HOUR, hourToMap);
    }
  }

  if (wasUndefined) {
    // set remaining time fields to 0, HH:00:00, 00:mm:00, 00:00:ss
    unitConfig
      .filter((unitDefinition) => unitDefinition.unit !== unit)
      .forEach(
        // @ts-expect-error - `unit` const maps to dayjs method
        (unitDefinition) => (dateBuilder = dateBuilder[unitDefinition.unit](0)),
      );
    if (use12HourClock && clockMode === PM && unit !== HOUR) {
      dateBuilder = dateBuilder.set(HOUR, HOUR_12);
    }
  }

  return dateBuilder.toDate();
};
