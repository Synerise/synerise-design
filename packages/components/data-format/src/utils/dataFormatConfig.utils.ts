import { type DataFormatConfig, type DataFormatNotationType } from '../types';

export const getDataFormatConfigFromNotation = (
  notation: DataFormatNotationType,
): DataFormatConfig => ({
  startWeekDayNotation: notation,
  dateFormatNotation: notation,
  timeFormatNotation: notation,
  numberFormatNotation: notation,
});
