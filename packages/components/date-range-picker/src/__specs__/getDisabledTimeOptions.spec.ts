import '@testing-library/jest-dom/extend-expect';

import { getDisabledTimeOptions } from '../RangePicker/utils';

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
    lowerLimit: null,
    day: '2023-03-30T08:08:07',
    upperLimit: '2023-03-30T09:36:54',
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, -1],
  },
  {
    lowerLimit: '2023-03-30T15:29:24',
    day: '2023-03-30T16:27:28',
    upperLimit: null,
    granularity: 'HOURS',
    is12HoursClock: true,
    disabledResultArray: [0, 1, 2, 3, 12],
  },
];

describe('RangePicker::getDisabledTimeOptions', () => {
  it('should calculate correct disabled values', () => {
    TEST_DATA_SET.forEach(testDataObject => {
      const initialDay = testDataObject.day === null ? null : new Date(testDataObject.day);
      const granularity = testDataObject.granularity;
      const initialLowerLimit = testDataObject.lowerLimit === null ? null : new Date(testDataObject.lowerLimit);
      const initialUpperLimit = testDataObject.upperLimit === null ? null : new Date(testDataObject.upperLimit);
      const is12HoursClock = testDataObject.is12HoursClock;

      expect(
        getDisabledTimeOptions(initialDay, granularity, initialLowerLimit, initialUpperLimit, is12HoursClock)
      ).toStrictEqual(testDataObject.disabledResultArray);
    });
  });
});
