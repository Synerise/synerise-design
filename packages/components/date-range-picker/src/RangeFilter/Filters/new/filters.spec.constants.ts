import { type DailySchedule } from './Daily/Daily.types';

export const DAY_VALUE_HOUR = {
    "start":"00:00:00.000",
    "stop":"23:59:59.999",
    "restricted":false,
    "display":false,
    "inverted":false,
    "mode":"Hour"
} as DailySchedule;
export const DAY_VALUE_RANGE = {
    ...DAY_VALUE_HOUR,
    "mode": "Range"
}

export const ERROR_MESSAGE = 'error message';

export const MONTHLY_SCHEDULE_TEST_DATA = [
  {
        case: 1,
        value: {
        '1234': {
          0: { ...DAY_VALUE_RANGE },
          2: { ...DAY_VALUE_RANGE }
        },
        '5678': {
          0: { ...DAY_VALUE_HOUR },
          3: { ...DAY_VALUE_HOUR },
          4: { ...DAY_VALUE_HOUR }
        }
      },
      errors:  {
          '1234': {
            0: [ERROR_MESSAGE, ERROR_MESSAGE],
            2: [ERROR_MESSAGE, ERROR_MESSAGE]
          },
          '5678': {
            0: [ERROR_MESSAGE],
            3: [ERROR_MESSAGE],
            4: [ERROR_MESSAGE]
          }
        },
        dayIndex: 2,
        expectedTimepickerCount: 2,
        expectedErrorCount: 2
    },
    {
        case: 2,
        value: {
        '1234': {
          0: { ...DAY_VALUE_RANGE },
          2: { ...DAY_VALUE_RANGE }
        },
        '5678': {
          0: { ...DAY_VALUE_HOUR },
          2: { ...DAY_VALUE_HOUR },
          4: { ...DAY_VALUE_HOUR }
        }
      },
      errors:  {
        '1234': {
          0: [ERROR_MESSAGE, ERROR_MESSAGE],
          2: [undefined, ERROR_MESSAGE]
        },
        '5678': {
          0: [ERROR_MESSAGE],
          2: [undefined],
          4: [ERROR_MESSAGE]
        }
      }, 
      dayIndex: 2,
      expectedTimepickerCount: 3,
      expectedErrorCount: 1
    }
]
  
export const WEEKLY_SCHEDULE_VALUE = {
    '1234': {
        0: { ...DAY_VALUE_RANGE },
        2: { ...DAY_VALUE_RANGE }
    },
    '5678': {
        0: { ...DAY_VALUE_HOUR },
        3: { ...DAY_VALUE_HOUR },
        4: { ...DAY_VALUE_HOUR }
    }
}
  
  export const WEEKLY_SCHEDULE_TEST_DATA = [
    {
        case: 0,
        value: WEEKLY_SCHEDULE_VALUE,
        errors: {
            '1234': {
                0: [ERROR_MESSAGE, ERROR_MESSAGE],
                2: [ERROR_MESSAGE, ERROR_MESSAGE]
            },
            '5678': {
                0: [ERROR_MESSAGE],
                3: [ERROR_MESSAGE],
                4: [ERROR_MESSAGE]
            }
        },
        dayIndex: 2,
        expectedTimepickerCount: 2,
        expectedErrorCount: 2
    },
    {
        case: 1,
        value: {
            '1234': {
                0: { ...DAY_VALUE_RANGE },
                2: { ...DAY_VALUE_RANGE }
            },
            '5678': {
                0: { ...DAY_VALUE_HOUR },
                3: { ...DAY_VALUE_HOUR },
                4: { ...DAY_VALUE_HOUR }
            }
        },
        errors: {
            '1234': {
                0: [undefined, ERROR_MESSAGE],
                2: [ERROR_MESSAGE, undefined]
            },
            '5678': {
                0: [ERROR_MESSAGE],
                3: [undefined],
                4: [ERROR_MESSAGE]
            }
        },
        dayIndex: 2,
        expectedTimepickerCount: 2,
        expectedErrorCount: 1
    }
  ];
  export const DAILY_FILTER_VALUE = [{...DAY_VALUE_RANGE}]
  export const DAILY_SCHEDULE_TEST_DATA = [
    {
      case: 'A',
      value: [{...DAY_VALUE_HOUR},{...DAY_VALUE_RANGE},{...DAY_VALUE_HOUR}],
      errors: [[ERROR_MESSAGE], [undefined, ERROR_MESSAGE], [ERROR_MESSAGE]],
      expectedTimepickerCount: 4,
      expectedErrorCount: 3
    },
    {
      case: 'B',
      value: DAILY_FILTER_VALUE,
      errors: [[undefined, ERROR_MESSAGE]],
      expectedTimepickerCount: 2,
      expectedErrorCount: 1
    },
    {
      case: 'C',
      value: [{...DAY_VALUE_RANGE},{...DAY_VALUE_RANGE}],
      errors: [[undefined, ERROR_MESSAGE], [ERROR_MESSAGE, undefined]],
      expectedTimepickerCount: 4,
      expectedErrorCount: 2
    },
    {
      case: 'D',
      value: [{...DAY_VALUE_HOUR},{...DAY_VALUE_HOUR},{...DAY_VALUE_RANGE}],
      errors: [[undefined], [undefined], [ERROR_MESSAGE, ERROR_MESSAGE]],
      expectedTimepickerCount: 4,
      expectedErrorCount: 2
    }
  ]
  
