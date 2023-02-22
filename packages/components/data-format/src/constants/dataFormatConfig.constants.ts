import { createIntl, IntlShape } from 'react-intl';

import { DataFormatConfig, DataFormatNotationType } from '../types';

export const DEFAULT_DATA_FORMAT_NOTATION: DataFormatNotationType = 'EU';

export const DEFAULT_DATA_FORMAT_CONFIG: DataFormatConfig = {
  startWeekDayNotation: DEFAULT_DATA_FORMAT_NOTATION,
  dateFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
  timeFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
  numberFormatNotation: DEFAULT_DATA_FORMAT_NOTATION,
};

export const DEFAULT_DATA_FORMAT_INTL: IntlShape = createIntl({ locale: DEFAULT_DATA_FORMAT_NOTATION });
