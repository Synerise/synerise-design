import { denormalizeValue, isValidValue, normalizeValue } from './utils';
import { type FilterValue } from './RangeFilter.types';

const denormalizeWeeklyFilter = {
  definition: {
    '0': { day: 0, display: true, inverted: false, restricted: true, start: '09:15:00.000', stop: '23:59:59.999' },
    '2': {
      day: 2,
      display: true,
      inverted: false,
      restricted: true,
      start: '07:45:00.000',
      stop: '23:59:59.999',
    },
    '3': {
      day: 3,
      display: true,
      inverted: false,
      restricted: true,
      start: '00:00:00.000',
      stop: '10:45:00.000',
    },
  },
  type: 'WEEKLY',
};

const normalizedWeeklyFilter = {
  days: [
    { from: '09:15:00.000', to: '23:59:59.999', day: 1, inverted: false },
    { from: '07:45:00.000', to: '23:59:59.999', day: 3, inverted: false },
    { from: '00:00:00.000', to: '10:45:00.000', day: 4, inverted: false },
  ],
  nestingType: 'IN_PLACE',
  type: 'WEEKLY',
};

const normalizedDailyFilter = {
  day: undefined,
  display: false,
  from: '11:45:00.000',
  inverted: false,
  nestingType: 'IN_PLACE',
  restricted: true,
  to: '23:59:59.999',
  type: 'DAILY',
};

const denormalizedDailyFilter = {
  definition: {
    day: undefined,
    display: false,
    inverted: false,
    restricted: true,
    start: '11:45:00.000',
    stop: '23:59:59.999',
    type: 'DAILY',
    nestingType: 'IN_PLACE',
  },
  type: 'DAILY',
};

const denormalizedMonthlyFilterBeginningOfMonth = {
  definition: [
    {
      definition: {
        0: { day: 0, start: '06:45:00.000', stop: '23:59:59.999', restricted: true, display: true, inverted: false },
        5: { day: 5, start: '07:15:00.000', stop: '23:59:59.999', restricted: true, display: true, inverted: false },
        9: { day: 9, start: '07:30:00.000', stop: '23:59:59.999', restricted: true, display: true, inverted: false },
        25: { day: 25, start: '10:15:00.000', stop: '23:59:59.999', restricted: true, display: true, inverted: false },
      },
      id: 0.21939252054948732,
      period: 'MONTH',
      periodType: 'BEGINNING',
    },
  ],
  type: 'MONTHLY',
};
const denormalizedMonthlyFilterWithWeekPeriod = {
  type: 'MONTHLY',
  definition: [
    {
      period: 'WEEK',
      periodType: 'BEGINNING',
      definition: {
        '0': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 0,
          day: 0,
          type: 'MONTHLY',
        },
        '1': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 0,
          day: 1,
          type: 'MONTHLY',
        },
        '6': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 0,
          day: 6,
          type: 'MONTHLY',
        },
        '8': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 1,
          day: 1,
          type: 'MONTHLY',
        },
        '16': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 2,
          day: 2,
          type: 'MONTHLY',
        },
        '24': {
          start: '00:00:00.000',
          stop: '23:59:59.999',
          restricted: true,
          display: true,
          inverted: false,
          week: 3,
          day: 3,
          type: 'MONTHLY',
        },
      },
    },
  ],
};

const normalizedMonthlyFilterBeginningOfMonth = {
  rules: [
    {
      days: [
        { from: '06:45:00.000', to: '23:59:59.999', day: 1, inverted: false },
        { from: '07:15:00.000', to: '23:59:59.999', day: 6, inverted: false },
        { from: '07:30:00.000', to: '23:59:59.999', day: 10, inverted: false },
        { from: '10:15:00.000', to: '23:59:59.999', day: 26, inverted: false },
      ],
      inverted: false,
      type: 'MONTH',
    },
  ],
  type: 'MONTHLY',
  nestingType: 'IN_PLACE',
};

const normalizedMonthlyFilterWithWeekPeriod = {
  type: 'MONTHLY',
  nestingType: 'IN_PLACE',
  rules: [
    {
      weeks: [
        {
          week: 1,
          days: [
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 1,
              inverted: false,
              type: 'MONTHLY',
            },
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 2,
              inverted: false,
              type: 'MONTHLY',
            },
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 7,
              inverted: false,
              type: 'MONTHLY',
            },
          ],
        },
        {
          week: 2,
          days: [
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 2,
              inverted: false,
              type: 'MONTHLY',
            },
          ],
        },
        {
          week: 3,
          days: [
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 3,
              inverted: false,
              type: 'MONTHLY',
            },
          ],
        },
        {
          week: 4,
          days: [
            {
              from: '00:00:00.000',
              to: '23:59:59.999',
              day: 4,
              inverted: false,
              type: 'MONTHLY',
            },
          ],
        },
      ],
      type: 'WEEK',
      inverted: false,
    },
  ],
};

describe('DateRangePicker utils (snrs-components refactor)', () => {
  describe('should behave like the utils from the older component', () => {
    it('should normalize weekly filter values', () => {
      expect(normalizeValue(denormalizeWeeklyFilter as FilterValue)).toStrictEqual(normalizedWeeklyFilter);
    });
    it('should denormalize weekly filter values', () => {
      expect(denormalizeValue(normalizedWeeklyFilter)).toStrictEqual(denormalizeWeeklyFilter);
    });
    it('should normalize daily filter values', () => {
      expect(normalizeValue(denormalizedDailyFilter as FilterValue)).toStrictEqual(normalizedDailyFilter);
    });
    it('should denormalize daily filter values', () => {
      expect(denormalizeValue(normalizedDailyFilter)).toStrictEqual(denormalizedDailyFilter);
    });
    it('should normalize monthly filter values', () => {
      expect(normalizeValue(denormalizedMonthlyFilterBeginningOfMonth as FilterValue)).toStrictEqual(
        normalizedMonthlyFilterBeginningOfMonth
      );
    });
    it('should denormalize monthly filter values', () => {
      expect(denormalizeValue(normalizedDailyFilter)).toStrictEqual(denormalizedDailyFilter);
    });
    it('should normalize monthly filter values counted as days of week', () => {
      expect(normalizeValue(denormalizedMonthlyFilterWithWeekPeriod as FilterValue)).toStrictEqual(
        normalizedMonthlyFilterWithWeekPeriod
      );
    });
    it('should denormalize monthly filter values counted as days of week', () => {
      expect(denormalizeValue(normalizedMonthlyFilterWithWeekPeriod)).toMatchObject(
        denormalizedMonthlyFilterWithWeekPeriod
      );
    });
  });
});

const VALID_DAILY_FILTER = {
  definition: {
    start: '2014-03-04T00:00:00.000',
    stop: '2014-05-04T00:00:00.000',
    type: 'DAILY',

  },
  type: 'DAILY',
};

const INVALID_DAILY_FILTER = {
  definition: {
    start: null,
    stop: '2014-03-04T00:00:00.000',
    type: 'DAILY',
  },
  type: 'DAILY',
};

describe('DateRangePicker utils ', () => {
  describe('validators ', () => {
    it('should return true for valid daily filter', () => {
      expect(isValidValue(VALID_DAILY_FILTER)).toBe(true);
    });
    it('should return false for invalid daily filter', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isValidValue(INVALID_DAILY_FILTER as any)).toBe(false);
    });
  });
});
