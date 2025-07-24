import {
  type DayKey,
  type DayOptions,
} from '../../../Shared/TimeWindow/TimeWindow.types';
import { DEFAULT_MAX_ENTRIES } from '../constants';
import {
  type DayOfMonthIndex,
  type MonthlySchedule,
  type MonthlyScheduleDayValue,
} from './Monthly.types';

export const range = (start: number, stop: number): number[] => {
  const result = [];
  for (let i = start; i < stop; i += 1) {
    result.push(i);
  }
  return result;
};
export const haveActiveDaysCommonRange = (
  days: Record<DayOfMonthIndex, MonthlyScheduleDayValue>,
  activeDaysArray: DayKey[],
): boolean => {
  let previousDay: DayOptions | undefined;
  const activeDaysHaveDifferentRanges = activeDaysArray.some(
    (dayIndex): boolean => {
      const currentDay = days[dayIndex as DayOfMonthIndex];
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
  schedule: MonthlySchedule,
  activeDays: DayKey[],
  maxRanges: number = DEFAULT_MAX_ENTRIES,
): boolean => {
  return (
    Object.keys(schedule).length < maxRanges ||
    (Object.keys(schedule) as string[]).some(
      (key) =>
        activeDays.every(
          (day) => schedule[key][day as DayOfMonthIndex] === undefined,
        ) && !haveActiveDaysCommonRange(schedule[key], activeDays),
    )
  );
};
