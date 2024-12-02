import { getDisabledTimeOptions } from './utils';

type TestDataObject = {
  lowerLimit: string | null;
  day: string;
  upperLimit: string | null;
  granularity: 'HOURS' | 'MINUTES' | 'SECONDS';
  is12HoursClock: boolean;
  disabledResultArray: number[] | [];
};

const TEST_DATA_SET: TestDataObject[] = [
  {
    day: '2023-03-30T08:08:07',
    lowerLimit: null,
    upperLimit: '2023-03-30T09:36:54',
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [10, 11, -1],
  },
  {
    day: '2023-03-30T03:18:07',
    lowerLimit: null,
    upperLimit: '2023-03-30T05:41:54',
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [6, 7, 8, 9, 10, 11, -1],
  },
  {
    day: '2023-03-30T08:08:07',
    lowerLimit: null,
    upperLimit: '2023-03-30T20:06:54',
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [-1],
  },
  {
    day: '2023-03-30T16:27:28',
    lowerLimit: '2023-03-30T15:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [12, 1, 2, 3, -1],
  },
  {
    day: '2023-03-30T22:20:28',
    lowerLimit: '2023-03-30T18:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [12, 1, 2, 3, 4, 5, 6, -1],
  },
  {
    day: '2023-03-30T22:20:28',
    lowerLimit: '2023-03-30T18:19:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [12, 1, 2, 3, 4, 5, -1],
  },
  {
    day: '2023-03-30T15:27:28',
    lowerLimit: '2023-03-30T03:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [-1],
  },

  {
    day: '2023-03-30T08:08:07',
    lowerLimit: null,
    upperLimit: '2023-03-30T09:36:54',
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  {
    day: '2023-03-30T08:08:07',
    lowerLimit: null,
    upperLimit: '2023-03-30T20:06:54',
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [20, 21, 22, 23],
  },
  {
    day: '2023-03-30T16:27:28',
    lowerLimit: '2023-03-30T15:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    day: '2023-03-30T15:27:28',
    lowerLimit: '2023-03-30T03:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [0, 1, 2, 3],
  },
  {
    day: '2023-03-29T22:40:40',
    lowerLimit: '2023-03-30T02:29:24',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  {
    day: '2023-03-30T01:50:50',
    lowerLimit: null,
    upperLimit: '2023-03-29T22:29:24',
    granularity: 'HOURS',
    is12HoursClock: false,
    disabledResultArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
];

describe('RangePicker::getDisabledTimeOptions', () => {
  it('should calculate correct disabled values', () => {
    TEST_DATA_SET.forEach(testDataObject => {
      const initialDay = testDataObject.day === null ? undefined : new Date(testDataObject.day);
      const granularity = testDataObject.granularity;
      const initialLowerLimit = testDataObject.lowerLimit === null ? null : new Date(testDataObject.lowerLimit);
      const initialUpperLimit = testDataObject.upperLimit === null ? null : new Date(testDataObject.upperLimit);
      const is12HoursClock = testDataObject.is12HoursClock;

      expect(
        getDisabledTimeOptions(initialDay, granularity, initialLowerLimit, initialUpperLimit, is12HoursClock)
      ).toStrictEqual(testDataObject.disabledResultArray);
    });
  });
  it.todo('should calculate correct disabled values for 24 hours clock (more test cases in TEST_DATA_SET array)');
  it.todo('should calculate correct disabled values for 12 hours clock (more test cases in TEST_DATA_SET array)');
});
