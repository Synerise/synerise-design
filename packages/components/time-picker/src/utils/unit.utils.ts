import dayjs from 'dayjs';

import {
  HOUR,
  HOUR_12,
  MAP_24_HOUR_TO_12,
} from '../constants/timePicker.constants';

export const getUnitSelectedNumber = (
  value: Date | undefined,
  unit: dayjs.UnitType,
  use12HourClock: boolean | undefined,
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  let result = value && dayjs(value).get(unit);

  if (unit === HOUR && use12HourClock) {
    if (!result) {
      result = HOUR_12;
    }
    result = MAP_24_HOUR_TO_12[result as keyof typeof MAP_24_HOUR_TO_12];
  }
  return result;
};
