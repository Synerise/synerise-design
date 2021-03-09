import { DayOfWeekIndex, WeeklySchedule } from './Weekly.types';
import { DayOptions } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/TimeWindow.types';
import { DayKey } from '@synerise/ds-date-range-picker/dist/RangeFilter/TimeWindow/TimeWindow.types';
import { MAX_RANGES } from './Weekly';

export const haveActiveDaysCommonRange = (
  days: Record<keyof DayOfWeekIndex, WeeklySchedule>,
  activeDaysArray: DayKey[]
): boolean => {
  let previousDay: DayOptions | undefined;
  const activeDaysHaveDifferentRanges = activeDaysArray.some((dayIndex): boolean => {
    const currentDay = days[dayIndex as number];
    if (!currentDay) {
      return true;
    }
    if (!previousDay) {
      previousDay = currentDay;
      return false;
    }
    const areRangeDifferent = currentDay?.start !== previousDay?.start || currentDay?.stop !== previousDay?.stop;
    previousDay = currentDay;
    return areRangeDifferent;
  });
  return !activeDaysHaveDifferentRanges;
};

export const canAddAnotherRange = (schedule: WeeklySchedule, activeDays: DayKey[]) => {
  return (
    Object.keys(schedule).length < MAX_RANGES ||
    Object.keys(schedule).some(
      key =>
        activeDays.every(day => schedule[key][day] === undefined) &&
        !haveActiveDaysCommonRange(schedule[key], activeDays)
    )
  );
};
