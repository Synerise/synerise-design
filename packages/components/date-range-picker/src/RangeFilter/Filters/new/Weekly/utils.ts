import { DayOfWeekIndex, WeeklySchedule, WeeklyScheduleDayValue } from './Weekly.types';
import { MAX_RANGES } from '../constants';
import { DayKey } from '../../WeeklyFilter/WeeklyFilter.types';
import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';

export const range = (start: number, stop: number): number[] => {
  const result = [];
  for (let i = start; i < stop; i += 1) {
    result.push(i);
  }
  return result;
};
export const haveActiveDaysCommonRange = (
  days: Record<DayOfWeekIndex, WeeklyScheduleDayValue>,
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

export const canAddAnotherRange = (schedule: WeeklySchedule, activeDays: DayKey[]): boolean => {
  return (
    Object.keys(schedule).length < MAX_RANGES ||
    Object.keys(schedule).some(
      key =>
        activeDays.every(day => schedule[key][day] === undefined) &&
        !haveActiveDaysCommonRange(schedule[key], activeDays)
    )
  );
};
