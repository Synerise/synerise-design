import {
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from '../../Shared/TimeWindow/constants/timeWindow.constants';
import {
  removeDays,
  removeEmptyEntries,
  selectDisplayedRange,
  updateDays,
} from './scheduleUtils';

type Day = { start: string; stop: string };

const MORNING: Day = { start: '06:00:00.000', stop: '11:59:59.999' };
const EVENING: Day = { start: '18:00:00.000', stop: '23:59:59.999' };

const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
};

describe('schedule utils', () => {
  describe('removeEmptyEntries', () => {
    it('returns a new schedule without the ranges that have no days', () => {
      const schedule = deepFreeze({ a: { 0: MORNING }, b: {} });

      expect(removeEmptyEntries(schedule)).toEqual({ a: { 0: MORNING } });
      expect(schedule).toEqual({ a: { 0: MORNING }, b: {} });
    });
  });

  describe('updateDays', () => {
    it('updates the given days of one range without touching the input', () => {
      const schedule = deepFreeze({ a: { 0: MORNING, 1: MORNING }, b: { 0: EVENING } });

      const next = updateDays(schedule, 'a', [1, 2], () => EVENING);

      expect(next).toEqual({ a: { 0: MORNING, 1: EVENING, 2: EVENING }, b: { 0: EVENING } });
      expect(next).not.toBe(schedule);
      expect(next.a).not.toBe(schedule.a);
      expect(next.b).toBe(schedule.b);
    });

    it('returns the schedule unchanged for a range it does not hold', () => {
      const schedule = deepFreeze({ a: { 0: MORNING } });

      expect(updateDays(schedule, 'unknown', [0], () => EVENING)).toBe(schedule);
    });
  });

  describe('removeDays', () => {
    it('removes the days from the given ranges and drops the ranges left empty', () => {
      const schedule = deepFreeze({ a: { 0: MORNING, 1: MORNING }, b: { 1: EVENING } });

      expect(removeDays(schedule, ['a', 'b'], [1])).toEqual({ a: { 0: MORNING } });
      expect(schedule).toEqual({ a: { 0: MORNING, 1: MORNING }, b: { 1: EVENING } });
    });

    it('ignores a range it does not hold', () => {
      const schedule = deepFreeze({ a: { 0: MORNING } });

      expect(removeDays(schedule, ['unknown'], [0])).toEqual({ a: { 0: MORNING } });
    });
  });

  describe('selectDisplayedRange', () => {
    it('selects the days between two days in the order they are displayed', () => {
      // Sunday-first week: Sun (6), Mon (0), Tue (1)
      expect(selectDisplayedRange(US_NOTATION_WEEK_DAYS_INDEXES, 6, 1)).toEqual([6, 0, 1]);
      expect(selectDisplayedRange(US_NOTATION_WEEK_DAYS_INDEXES, 1, 6)).toEqual([6, 0, 1]);
    });

    it('matches numeric order for a Monday-first week', () => {
      expect(selectDisplayedRange(EU_NOTATION_WEEK_DAYS_INDEXES, 4, 1)).toEqual([1, 2, 3, 4]);
    });
  });
});
