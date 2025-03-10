import dayjs from 'dayjs';

import { handleTimeChange } from './timePicker.utils';
import { getClockModeFromDate, getOppositeClockMode } from './clockMode.utils';
import { HOUR, MINUTE, SECOND } from '../constants/timePicker.constants';

const initialValueAM = dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate();
const initialValuePM = dayjs('12-04-2020 17:24:52', 'DD-MM-YYYY HH:mm:ss').toDate();

const TEST_CASES_TIME_CHANGE_12_HOUR_CLOCK = [
  {
    value: initialValueAM,
    unit: HOUR,
    newValue: 9,
    clockModeChanged: false,
    result: '09:24:52 AM'
  },
  {
    value: initialValueAM,
    unit: MINUTE,
    newValue: 9,
    clockModeChanged: false,
    result: '10:09:52 AM'
  },
  {
    value: initialValueAM,
    unit: SECOND,
    newValue: 9,
    clockModeChanged: false,
    result: '10:24:09 AM'
  },
  {
    value: initialValuePM,
    unit: HOUR,
    newValue: 9,
    clockModeChanged: false,
    result: '09:24:52 PM'
  },
  {
    value: initialValuePM,
    unit: MINUTE,
    newValue: 9,
    clockModeChanged: false,
    result: '05:09:52 PM'
  },
  {
    value: initialValuePM,
    unit: SECOND,
    newValue: 9,
    clockModeChanged: false,
    result: '05:24:09 PM'
  },
  {
    value: initialValueAM,
    unit: undefined,
    newValue: undefined,
    clockMode: 'PM',
    clockModeChanged: true,
    result: '10:24:52 PM'
  },
  {
    value: initialValuePM,
    unit: undefined,
    newValue: undefined,
    clockMode: 'AM',
    clockModeChanged: true,
    result: '05:24:52 AM'
  }
]

const normalizeSpaces = (content: string | null) => {
  return content?.replace(/\u00A0|\u202F/g, ' ');
};

describe('handleTimeChange util', () => {
  it('in 12hr mode should calculate correct value after change', () => {
    TEST_CASES_TIME_CHANGE_12_HOUR_CLOCK.forEach( testCase => {
      const { value, unit, newValue, clockModeChanged, result } = testCase;
      let clockMode = getClockModeFromDate(value);
      if (clockModeChanged) {
        clockMode = getOppositeClockMode(clockMode);
      }
      
      const newDate = handleTimeChange(value, unit, newValue, clockModeChanged, true, clockMode, []);
      const formattedTime = dayjs(newDate).format('hh:mm:ss A');
      expect(normalizeSpaces(formattedTime)).toBe(result);
    });
  });

});
