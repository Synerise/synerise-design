import dayjs from 'dayjs';

import { AM, HOUR, HOUR_12, PM } from '../constants/timePicker.constants';

export const getClockModeFromDate = (date: Date | undefined): string => {
  const initialDate = dayjs(date);
  const initialHour = initialDate.get(HOUR);
  return initialHour >= HOUR_12 ? PM : AM;
};

export const getOppositeClockMode = (clockMode: string): string => {
  return clockMode === PM ? AM : PM;
};
