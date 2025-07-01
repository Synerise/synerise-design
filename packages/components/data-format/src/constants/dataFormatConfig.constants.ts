import { type IntlShape, createIntl } from 'react-intl';

import { type DataFormatConfig, type DataFormatNotationType } from '../types';

export const EU_NOTATION: DataFormatNotationType = 'EU';
export const US_NOTATION: DataFormatNotationType = 'US';

export const DEFAULT_DATA_FORMAT_NOTATION: DataFormatNotationType = EU_NOTATION;

export const DEFAULT_DATA_FORMAT_CONFIG: DataFormatConfig = {
  startWeekDayNotation: DEFAULT_DATA_FORMAT_NOTATION,
  dateFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
  timeFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
  numberFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
};

export const DEFAULT_DATA_FORMAT_INTL: IntlShape = createIntl({
  locale: 'pl',
});
