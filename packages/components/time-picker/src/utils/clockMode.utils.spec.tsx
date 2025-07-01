import dayjs from 'dayjs';

import { getClockModeFromDate } from './clockMode.utils';
import { TEST_CASES_FOR_12_HOUR_CLOCK } from '../constants/timePicker.spec.constants';

describe('clockMode util', () => {
  
  it('should return correct meridiem indicator from date', () => {
    for (const [_index, [key, value]] of Object.entries(Object.entries(TEST_CASES_FOR_12_HOUR_CLOCK))) {
      const formattedTime = dayjs(`12-04-2020 ${key}`, 'DD-MM-YYYY HH:mm:ss').toDate();
      const clockMode = value.split(' ').pop();
      expect(getClockModeFromDate(formattedTime)).toBe(clockMode);
    }
  });

});
