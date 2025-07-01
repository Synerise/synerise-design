import {
  type DayKey,
  type DayOptions,
} from '../../../Shared/TimeWindow/TimeWindow.types';
import { DEFAULT_MAX_ENTRIES } from '../constants';
import {
  type DayOfWeekIndex,
  type WeeklySchedule,
  type WeeklyScheduleDayValue,
} from './Weekly.types';

export const range = (start: number, stop: number): number[] => {
  const result = [];
  for (let i = start; i < stop; i += 1) {
    result.push(i);
  }
  return result;
};
export const haveActiveDaysCommonRange = (
  days: Record<DayOfWeekIndex, WeeklyScheduleDayValue>,
  activeDaysArray: DayKey[],
): boolean => {
  let previousDay: DayOptions | undefined;
  const activeDaysHaveDifferentRanges = activeDaysArray.some(
    (dayIndex): boolean => {
      const currentDay = days[dayIndex as number];
      if (!currentDay) {
        return true;
      }
      if (!previousDay) {
        previousDay = currentDay;
        return false;
      }
      const areRangeDifferent =
        currentDay?.start !== previousDay?.start ||
        currentDay?.stop !== previousDay?.stop;
      previousDay = currentDay;
      return areRangeDifferent;
    },
  );
  return !activeDaysHaveDifferentRanges;
};

export const canAddAnotherRange = (
  schedule: WeeklySchedule,
  activeDays: DayKey[],
  maxRanges: number = DEFAULT_MAX_ENTRIES,
): boolean => {
  return (
    Object.keys(schedule).length < maxRanges ||
    Object.keys(schedule).some(
      (key) =>
        activeDays.every((day) => schedule[key][day] === undefined) &&
        !haveActiveDaysCommonRange(schedule[key], activeDays),
    )
  );
};

export const removeEmptyEntries = (weeklySchedule: WeeklySchedule): void => {
  const emptyEntries = Object.keys(weeklySchedule).filter(
    (key) => Object.keys(weeklySchedule[key]).length === 0,
  );
  const scheduleToUpdate = weeklySchedule;
  emptyEntries.forEach((emptyEntry) => {
    delete scheduleToUpdate[emptyEntry];
  });
};
