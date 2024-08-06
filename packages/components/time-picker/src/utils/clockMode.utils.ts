import { AM, HOUR_12, PM } from '../constants/timePicker.constants';

export const getClockModeFromDate = (date: Date): string => {
  const initialHour = date.getHours();
  return initialHour >= HOUR_12 ? PM : AM;
};

export const getOppositeClockMode = (clockMode: string): string => {
  return clockMode === PM ? AM : PM;
};
