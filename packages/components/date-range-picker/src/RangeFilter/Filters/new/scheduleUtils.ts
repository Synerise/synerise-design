import type { DayKey } from '../../Shared/TimeWindow/TimeWindow.types';
import type { ScheduleRows } from './Filters.types';

export const removeEmptyEntries = <T>(
  schedule: ScheduleRows<T>,
): ScheduleRows<T> =>
  Object.fromEntries(
    Object.entries(schedule).filter(([, days]) => Object.keys(days).length),
  );

export const updateDays = <T>(
  schedule: ScheduleRows<T>,
  guid: string,
  dayKeys: DayKey[],
  update: (day: T) => T,
): ScheduleRows<T> => {
  if (!(guid in schedule)) {
    return schedule;
  }
  const days = { ...schedule[guid] };
  dayKeys.forEach((dayKey) => {
    days[dayKey] = update(schedule[guid][dayKey]);
  });
  return { ...schedule, [guid]: days };
};

export const removeDays = <T>(
  schedule: ScheduleRows<T>,
  guids: string[],
  dayKeys: DayKey[],
): ScheduleRows<T> => {
  const removedKeys = dayKeys.map(String);
  const updated = { ...schedule };
  guids
    .filter((guid) => guid in schedule)
    .forEach((guid) => {
      updated[guid] = Object.fromEntries(
        Object.entries(schedule[guid]).filter(
          ([dayKey]) => !removedKeys.includes(dayKey),
        ),
      );
    });
  return removeEmptyEntries(updated);
};

export const selectDisplayedRange = (
  displayedKeys: readonly DayKey[],
  from: DayKey,
  to: DayKey,
): DayKey[] => {
  const fromIndex = displayedKeys.indexOf(from);
  const toIndex = displayedKeys.indexOf(to);
  return displayedKeys.slice(
    Math.min(fromIndex, toIndex),
    Math.max(fromIndex, toIndex) + 1,
  );
};
