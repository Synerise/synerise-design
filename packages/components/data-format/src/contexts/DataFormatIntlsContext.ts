import { createContext } from 'react';

import { DEFAULT_DATA_FORMAT_INTL } from '../constants';
import { DataFormatIntls } from '../types';

export const DataFormatIntlsContext = createContext<DataFormatIntls>({
  timeFormatIntl: DEFAULT_DATA_FORMAT_INTL,
  numberFormatIntl: DEFAULT_DATA_FORMAT_INTL,
  dateFormatIntl: DEFAULT_DATA_FORMAT_INTL,
});
